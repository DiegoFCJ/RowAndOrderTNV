import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FullFavourite, MovieData } from 'src/models/movieData';
import { MovieRootObject } from 'src/models/movies';
import { AuthService } from 'src/services/auth.service';
import { MovieAPIService } from 'src/services/movie-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    protected authService: AuthService, 
    protected movieServ: MovieAPIService,
    private http: HttpClient,  
    private router: Router) {}

    ngOnInit(): void {
      if (!this.authService.isAuthenticated()) {
       alert("Non puoi accedere a questa pagina senza permesso! Esegui l'accesso")
       this.router.navigateByUrl("/login");
     }
     this.getAllFavouriteMovies(this.authService.getCurrentUser().id);
    }

    getAllFavouriteMovies(id : number){

      this.http.get<FullFavourite[]>(`http://localhost:5268/reviews/fromuser/${id}`)
      .subscribe((data) => {
        this.movieServ.favourites = data;
        for(let i = 0; i < data.length; i++){
          this.http.get<MovieRootObject>(`https://api.themoviedb.org/3/movie/${data[i].movieId}?api_key=3949444e64e7a9355250d3b1b5c59bf1&language=en-en`)
          .subscribe((res) => {
            console.log(res.poster_path)
            this.movieServ.favourites[i] = {
              id: this.movieServ.favourites[i].id,
              comment: this.movieServ.favourites[i].comment,
              userId: this.movieServ.favourites[i].userId,
              movieId: this.movieServ.favourites[i].movieId,
              rating: this.movieServ.favourites[i].rating,
              title: res.title,
              poster_path: res.poster_path
            }
          });
        }
      });
    }

    deleteFavourite(){
      this.http.delete<MovieData>(`http://localhost:5268/reviews/${this.movieServ.singleFavourite.id}`).subscribe();
      window.location.reload()
    }



}
