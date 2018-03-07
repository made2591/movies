package main

import (
	"os"
	"fmt"
	"errors"
	"strings"
	"net/http"
	"encoding/json"
	"github.com/aws/aws-lambda-go/lambda"
)

var (
	API_KEY      = os.Getenv("API_KEY")
	API_BASE_URL = os.Getenv("API_BASE_URL")
	AWS_API_KEY  = os.Getenv("AWS_API_KEY")
	ErrorBackend = errors.New("Something went wrong")
)

type Request struct {
	Url 					string		`json:"api_url"`
	AwsApiGatewayKey 		string		`json:"aws_api_gateway_key"`

	ExternalID 				*string		`json:"external_id"`
	ExternalSource 			*string		`json:"external_source"`

	Query 					*string		`json:"query"`

	ApiKey 					*string 	`json:"api_key"`
	Language 				*string 	`json:"language"`
	Region 					*string 	`json:"region"`
	SortBy 					*string 	`json:"sort_by"`
	CertificationCountry 	*string 	`json:"certification_country"`
	Certification 			*string 	`json:"certification"`
	CertificationLTE 		*string 	`json:"certification.lte"`
	IncludeAdult			*string 	`json:"include_adult"`
	IncludeVideo 			*string 	`json:"include_video"`
	Page 					*string 	`json:"page"`
	PrimaryReleaseYear 		*string 	`json:"primary_release_year"`
	PrimaryReleaseDateGTE 	*string 	`json:"primary_release_date.gte"`
	PrimaryReleaseDateLTE	*string 	`json:"primary_release_date.lte"`
	ReleaseDateGTE 			*string 	`json:"release_date.gte"`
	ReleaseDateLTE 			*string 	`json:"release_date.lte"`
	VoteCountGTE 			*string 	`json:"vote_count.gte"`
	VoteCountLTE 			*string 	`json:"vote_count.lte"`
	VoteAverageGTE 			*string 	`json:"vote_average.gte"`
	VoteAverageLTE 			*string 	`json:"vote_average.lte"`
	WithCast 				*string 	`json:"with_cast"`
	WithCrew 				*string 	`json:"with_crew"`
	WithCompanies 			*string 	`json:"with_companies"`
	WithGenres 				*string 	`json:"with_genres"`
	WithKeywords 			*string 	`json:"with_keywords"`
	WithPeople 				*string 	`json:"with_people"`
	Year 					*string 	`json:"year"`
	WithoutGenres 			*string 	`json:"without_genres"`
	WithRuntimeGTE 			*string 	`json:"with_runtime.gte"`
	WithRuntimeLTE 			*string 	`json:"with_runtime.lte"`
	WithReleaseType 		*string 	`json:"with_release_type"`
	WithOriginalLanguage 	*string 	`json:"with_original_language"`
	WithoutKeywords 		*string 	`json:"without_keywords"`
}

type MovieDBResponse struct {
	Page 					int 	`json:"page"`
	Results 				[]Movie `json:"results"`
	TotalResults			int 	`json:"total_results"`
	TotalPages 				int 	`json:"total_pages"`
}

type Movie struct {
	Description				string 	`json:"overview"`
	Cover 					string 	`json:"poster_path"`
	PosterPath 				string 	`json:"poster_path"`
	Adult 					bool 	`json:"adult"`
	Overview 				string 	`json:"overview"`
	ReleaseDate 			string 	`json:"release_date"`
	GenreIDs 				[]int 	`json:"genre_ids"`
	ID 						int 	`json:"id"`
	OriginalTitle 			string 	`json:"original_title"`
	OriginalLanguage 		string 	`json:"original_language"`
	Title 					string 	`json:"title"`
	BackdropPath 			string 	`json:"backdrop_path"`
	Popularity 				float32 `json:"popularity"`
	VoteCount 				int 	`json:"vote_count"`
	Video 					bool 	`json:"video"`
	VoteAverage 			float32 `json:"vote_average"`
}

func Handler(request Request) ([]Movie, error) {

	if request.Url == "" || request.AwsApiGatewayKey == "" || strings.Compare(request.AwsApiGatewayKey, AWS_API_KEY) != 0 {
		return []Movie{}, errors.New("Missing one or two required parameters: 'api_url, aws_api_gateway_key'")
	}

	url := fmt.Sprintf("%s%s?api_key=%s", API_BASE_URL, request.Url, API_KEY)

	client := &http.Client{}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return []Movie{}, ErrorBackend
	}

	if request.CertificationCountry != nil {
		q := req.URL.Query()
		q.Add("certification_country", *request.CertificationCountry)
		req.URL.RawQuery = q.Encode()
	}

	if request.VoteAverageLTE != nil {
		q := req.URL.Query()
		q.Add("vote_average.lte", *request.VoteAverageLTE)
		req.URL.RawQuery = q.Encode()
	}

	if request.WithoutGenres != nil {
		q := req.URL.Query()
		q.Add("without_genres", *request.WithoutGenres)
		req.URL.RawQuery = q.Encode()
	}

	if request.WithCast != nil {
		q := req.URL.Query()
		q.Add("with_cast", *request.WithCast)
		req.URL.RawQuery = q.Encode()
	}

	if request.Language != nil {
		q := req.URL.Query()
		q.Add("language", *request.Language)
		req.URL.RawQuery = q.Encode()
	}

	if request.WithRuntimeLTE != nil {
		q := req.URL.Query()
		q.Add("with_runtime.lte", *request.WithRuntimeLTE)
		req.URL.RawQuery = q.Encode()
	}

	if request.Region != nil {
		q := req.URL.Query()
		q.Add("region", *request.Region)
		req.URL.RawQuery = q.Encode()
	}

	if request.WithCrew != nil {
		q := req.URL.Query()
		q.Add("with_crew", *request.WithCrew)
		req.URL.RawQuery = q.Encode()
	}

	if request.WithReleaseType != nil {
		q := req.URL.Query()
		q.Add("with_release_type", *request.WithReleaseType)
		req.URL.RawQuery = q.Encode()
	}

	if request.IncludeAdult != nil {
		q := req.URL.Query()
		q.Add("include_adult", *request.IncludeAdult)
		req.URL.RawQuery = q.Encode()
	}

	if request.CertificationLTE != nil {
		q := req.URL.Query()
		q.Add("certification.lte", *request.CertificationLTE)
		req.URL.RawQuery = q.Encode()
	}

	if request.WithKeywords != nil {
		q := req.URL.Query()
		q.Add("with_keywords", *request.WithKeywords)
		req.URL.RawQuery = q.Encode()
	}

	if request.IncludeVideo != nil {
		q := req.URL.Query()
		q.Add("include_video", *request.IncludeVideo)
		req.URL.RawQuery = q.Encode()
	}

	if request.PrimaryReleaseDateGTE != nil {
		q := req.URL.Query()
		q.Add("primary_release_date.gte", *request.PrimaryReleaseDateGTE)
		req.URL.RawQuery = q.Encode()
	}

	if request.WithoutKeywords != nil {
		q := req.URL.Query()
		q.Add("without_keywords", *request.WithoutKeywords)
		req.URL.RawQuery = q.Encode()
	}

	if request.Page != nil {
		q := req.URL.Query()
		q.Add("page", *request.Page)
		req.URL.RawQuery = q.Encode()
	}

	if request.VoteAverageGTE != nil {
		q := req.URL.Query()
		q.Add("vote_average.gte", *request.VoteAverageGTE)
		req.URL.RawQuery = q.Encode()
	}

	if request.ReleaseDateLTE != nil {
		q := req.URL.Query()
		q.Add("release_date.lte", *request.ReleaseDateLTE)
		req.URL.RawQuery = q.Encode()
	}

	if request.ApiKey != nil {
		q := req.URL.Query()
		q.Add("api_key", *request.ApiKey)
		req.URL.RawQuery = q.Encode()
	}

	if request.WithRuntimeGTE != nil {
		q := req.URL.Query()
		q.Add("with_runtime.gte", *request.WithRuntimeGTE)
		req.URL.RawQuery = q.Encode()
	}

	if request.WithGenres != nil {
		q := req.URL.Query()
		q.Add("with_genres", *request.WithGenres)
		req.URL.RawQuery = q.Encode()
	}

	if request.Certification != nil {
		q := req.URL.Query()
		q.Add("certification", *request.Certification)
		req.URL.RawQuery = q.Encode()
	}

	if request.ReleaseDateGTE != nil {
		q := req.URL.Query()
		q.Add("release_date.gte", *request.ReleaseDateGTE)
		req.URL.RawQuery = q.Encode()
	}

	if request.VoteCountLTE != nil {
		q := req.URL.Query()
		q.Add("vote_count.lte", *request.VoteCountLTE)
		req.URL.RawQuery = q.Encode()
	}

	if request.WithOriginalLanguage != nil {
		q := req.URL.Query()
		q.Add("with_original_language", *request.WithOriginalLanguage)
		req.URL.RawQuery = q.Encode()
	}

	if request.PrimaryReleaseYear != nil {
		q := req.URL.Query()
		q.Add("primary_release_year", *request.PrimaryReleaseYear)
		req.URL.RawQuery = q.Encode()
	}

	if request.WithCompanies != nil {
		q := req.URL.Query()
		q.Add("with_companies", *request.WithCompanies)
		req.URL.RawQuery = q.Encode()
	}

	if request.WithPeople != nil {
		q := req.URL.Query()
		q.Add("with_people", *request.WithPeople)
		req.URL.RawQuery = q.Encode()
	}

	if request.ExternalID != nil {
		q := req.URL.Query()
		q.Add("external_id", *request.ExternalID)
		req.URL.RawQuery = q.Encode()
	}

	if request.SortBy != nil {
		q := req.URL.Query()
		q.Add("sort_by", *request.SortBy)
		req.URL.RawQuery = q.Encode()
	}

	if request.Year != nil {
		q := req.URL.Query()
		q.Add("year", *request.Year)
		req.URL.RawQuery = q.Encode()
	}

	if request.ExternalSource != nil {
		q := req.URL.Query()
		q.Add("external_source", *request.ExternalSource)
		req.URL.RawQuery = q.Encode()
	}

	if request.Query != nil {
		q := req.URL.Query()
		q.Add("query", *request.Query)
		req.URL.RawQuery = q.Encode()
	}

	if request.PrimaryReleaseDateLTE != nil {
		q := req.URL.Query()
		q.Add("primary_release_date.lte", *request.PrimaryReleaseDateLTE)
		req.URL.RawQuery = q.Encode()
	}

	if request.VoteCountGTE != nil {
		q := req.URL.Query()
		q.Add("vote_count.gte", *request.VoteCountGTE)
		req.URL.RawQuery = q.Encode()
	}

	resp, err := client.Do(req)
	if err != nil {
		return []Movie{}, ErrorBackend
	}
	defer resp.Body.Close()

	var data MovieDBResponse
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return []Movie{}, ErrorBackend
	}

	return data.Results, nil
}

func main() {
	lambda.Start(Handler)
}
