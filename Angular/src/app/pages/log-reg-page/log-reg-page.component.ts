import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { MovieAPIService } from 'src/services/movie-api.service';

@Component({
  selector: 'app-log-reg-page',
  templateUrl: './log-reg-page.component.html',
  styleUrls: ['./log-reg-page.component.scss']
})
export class LogRegPageComponent implements OnInit {

  constructor(private authServ: AuthService, private router: Router, protected movieSer: MovieAPIService) {}

  ngOnInit(): void {
    if (this.authServ.isAuthenticated()) {
      alert("You should logout before logging in again")
      this.router.navigateByUrl("/");
    }
  }
  
  register(form: NgForm) {
    console.log(form.value)
    if (form.valid) {
      this.authServ.register(form.value).subscribe();
    }
  }

  login(form: NgForm) {
    
    this.movieSer.userNameLogged = form.value.username;
    form.control.markAllAsTouched();

    if (form.valid) {
      this.authServ.login(form.value).subscribe({
        next: (response) => {
          this.authServ.saveUserInLocalStorage(response);
          this.router.navigate(['main-page']);
        }
      })
    }
  }
}
