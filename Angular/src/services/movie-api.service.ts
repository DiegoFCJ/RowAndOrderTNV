import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FullFavourite } from 'src/models/movieData';
import { MovieRootObject } from 'src/models/movies';

@Injectable({
  providedIn: 'root',
})
export class MovieAPIService {
  attribute: any;
  favourites: FullFavourite[] = [];
  singleFavourite: FullFavourite = {
    id: 0,
    comment: '',
    userId: 0,
    movieId: 0,
    rating: 0,
    title: '',
    poster_path: ''
  }
  orderedMoviz: MovieRootObject[] = [];
  rating: number = 0;
  userNameLogged: string = '';

  constructor(private modalService: NgbModal, private http: HttpClient) {}

  getRandomMoviee(url: any) {
    return this.http.get<MovieRootObject>(url);
  }

  getFavouriteMovieByMovieId(id: number){
    return this.favourites.find(x => x.id === id);
  }

  openOneFav(content: any, data:any){
    this.singleFavourite = {
      id: data.id,
      comment: data.comment,
      userId: data.userId,
      movieId: data.movieId,
      rating: data.rating,
      title: data.title,
      poster_path: data.poster_path
    };

		this.modalService.open(content);
  }
}
