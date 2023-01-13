import { UserFull } from '../../../models/user';
import { AuthService } from 'src/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieRootObject } from 'src/models/movie';
import { MovieAPIService } from 'src/services/movie-api.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { ScoreService } from 'src/services/score.service';


@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {
  attributes = ['revenue', 'release_date', 'popularity'];
  stringCondPrint: string = "";
  currentUser: Partial<UserFull> = this.authServ.getCurrentUser();
  randomMovies: MovieRootObject[] = [];

  constructor(
    protected movieServ: MovieAPIService, 
    private router: Router, 
    protected authServ: AuthService,
    protected scoreServ: ScoreService) { }


  ngOnInit(): void {
    if (!this.authServ.isAuthenticated()) {
      alert("Non puoi accedere a questa pagina senza permesso! Esegui l'accesso")
      this.router.navigateByUrl("/sign");
    }else{
      this.movieServ.rating;
      this.movieServ.attribute = this.attributes[Math.floor(Math.random() * this.attributes.length)];
      for (let i = 0; i < 10; i++) {
       this.getRandomMovie(this.movieServ.attribute);
     }
    }
  }

  getRandomMovie(attributeS: any) {
    const latestId = 30000;
    const randomId = Math.round(Math.random() * latestId);
    this.movieServ.getMovie(randomId).subscribe({
    next: (res) => {
      if (res.poster_path) {
        this.randomMovies.push(res); 
        this.movieServ.ordMovies.push(res);
        this.movieServ.ordMovies.sort((a: any, b: any) => a[attributeS] > b[attributeS] ? 1 : b[attributeS] > a[attributeS] ? -1 : 0)
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
    moveItemInArray(this.randomMovies, event.previousIndex, event.currentIndex);
  }

  checkResult() {
    this.router.navigate(['/review']);

    for (let i = 0; i < 10; i++) {
      if (this.randomMovies[i] === this.movieServ.ordMovies[i]) {
        this.movieServ.rating = this.movieServ.rating + 10;
      }
    }

    this.scoreServ.scoreForDB = {
      userId: this.authServ.getCurrentUser().id,
      userName: this.authServ.getCurrentUser().username,
      score: this.movieServ.rating
    }

    this.scoreServ.saveNewScore().subscribe();
  }

  printGameType(){
    if(this.movieServ.attribute === "release_date"){
      this.stringCondPrint = "piú vecchio";
      return "data di rilascio"
    } else if(this.movieServ.attribute === "revenue"){
      this.stringCondPrint = "film con meno fatturato";
      return "fatturato"
    }
    this.stringCondPrint = "meno popolare";
    return "popolaritá"
  }
}


