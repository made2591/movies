import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterMoviesComponent } from './theater-movies.component';

describe('TheaterMoviesComponent', () => {
  let component: TheaterMoviesComponent;
  let fixture: ComponentFixture<TheaterMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheaterMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheaterMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
