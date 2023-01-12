import { UserLocalSt } from '../../../models/user';
import { AuthService } from 'src/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MovieRootObject } from 'src/models/movies';
import { MovieAPIService } from 'src/services/movie-api.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { ScoreInfo, User } from 'src/models/user';


@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {
  stringCondPrint: string = "";

  constructor(private http: HttpClient, protected MovieServ: MovieAPIService, private router: Router, protected authServ: AuthService) { }
  currentUser: Partial<UserLocalSt> = this.authServ.getCurrentUser();

  ngOnInit(): void {
    if (!this.authServ.isAuthenticated()) {
      alert("You cannot access on this page without permission")
      this.router.navigateByUrl("/sign");
    }else{
      this.MovieServ.rating;
      const attributes = ['revenue', 'release_date', 'popularity'];
      this.MovieServ.attribute = attributes[Math.floor(Math.random() * attributes.length)];
      for (let i = 0; i < 10; i++) {
       this.getRandomMovie(this.MovieServ.attribute);
     }
     console.log(this.movie + " " + this.MovieServ.attribute)
    }
  }

  movie: MovieRootObject[] = [];   //array su questo component

  getRandomMovie(attributeS: any) {
    const latestId = 30000;
    const randomId = Math.round(Math.random() * latestId);
    this.http.get<MovieRootObject>(`https://api.themoviedb.org/3/movie/${randomId}?api_key=3949444e64e7a9355250d3b1b5c59bf1&language=it-it`)
      .subscribe({next: (res) => {

          if (res.poster_path) {
            this.movie.push(res); 
            this.MovieServ.orderedMoviz.push(res);
            this.MovieServ.orderedMoviz.sort((a: any, b: any) =>
              a[attributeS] > b[attributeS] ? 1 : b[attributeS] > a[attributeS] ? -1 : 0)
          } else {
            this.getRandomMovie(attributeS);
          }
        },
        error: () => {
          this.getRandomMovie(attributeS);
        },
      });
  }


  drop(event: CdkDragDrop<{ title: string; poster: string }[]>) {
    moveItemInArray(this.movie, event.previousIndex, event.currentIndex);
  }

  checkResult() {
    this.router.navigate(['/review-page']);
    for (let i = 0; i < 10; i++) {
      if (this.movie[i] === this.MovieServ.orderedMoviz[i]) {
        this.MovieServ.rating = this.MovieServ.rating + 10;
      }
    }

    let scoreComp: ScoreInfo = {
      userId: this.authServ.getCurrentUser().id,
      userName: this.authServ.getCurrentUser().username,
      score: this.MovieServ.rating

    }

    this.http.post<ScoreInfo>(`http://localhost:4567/score`, scoreComp).subscribe()
  }

  printGameType(){
    if(this.MovieServ.attribute === "release_date"){
      this.stringCondPrint = "piú vecchio";
      return "data di rilascio"
    } else if(this.MovieServ.attribute === "revenue"){
      this.stringCondPrint = "film con meno fatturato";
      return "fatturato"
    }
    this.stringCondPrint = "meno popolare";
    return "popolaritá"
  }
}


