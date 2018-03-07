export class User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  api_key: string;
  liked: Array<number>;
}

export class TMDBResponse {
  page: number;
  results: Array<TMDBMovie>;
  total_results: number;
  total_pages: number;
}

export class TMDBMovie {
  id: number;
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}
