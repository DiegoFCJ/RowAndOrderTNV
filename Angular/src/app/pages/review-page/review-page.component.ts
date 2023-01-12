import { Component, OnInit, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MovieData } from 'src/models/movieData';
import { Router } from '@angular/router';
import { MovieAPIService } from 'src/services/movie-api.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class ReviewPageComponent implements OnInit {

  currentRate= 2;
  num: number = 0;
  movieID = 0;

  constructor(
    config: NgbModalConfig, 
    protected authServ: AuthService, 
    private modalService: NgbModal, 
    protected MovieServ: MovieAPIService, 
    private http: HttpClient, 
    private router: Router) { 
    config.backdrop = 'static';
        config.keyboard = false;
  }

  open(content: any, numID:number) {
        this.modalService.open(content);
    this.movieID = numID;
    }

  ngOnInit(): void {
    if (!this.authServ.isAuthenticated()) {
      alert("You cannot access on this page without permission")
      this.router.navigateByUrl("/sign");
    }
    console.log(this.MovieServ.orderedMoviz)
    console.log(this.MovieServ.rating)
  }


  onSubmit(e: NgForm) {

  let dbComp: MovieData = {
    comment: e.form.value.comment,
    rating: e.form.value.rating,
    movieId: this.movieID,
    userId: this.authServ.getCurrentUser().id
  }

  console.log(dbComp)

  this.http
      .post<MovieData>('http://localhost:5268/reviews', dbComp)
      .subscribe((dat) => {}); 
  }

  
  numChange(num: number){
    return this.num = num;
  }

  justOpenTempl(content: any){
    this.modalService.open(content);
  }

  adultsFilm(isAdultFilm: boolean){
    if(isAdultFilm){
      return "This film is for adults only! 🔞";
    }else{
      return "You can watch this film with your family ✅";
    }
  }

}
