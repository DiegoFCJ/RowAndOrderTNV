import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { MovieAPIService } from 'src/services/movie-api.service';

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.scss']
})
export class SignPageComponent implements OnInit {

  constructor(private authServ: AuthService, private router: Router, protected movieSer: MovieAPIService) {}

  ngOnInit(): void {
    if (this.authServ.isAuthenticated()) {
      alert("Hai gia eseguito il login, non puoi registrarti o eseguirne un altro se prima non esegui il logout!")
      this.router.navigateByUrl("/home");
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
          this.router.navigateByUrl("/home");
        }
      })
    }
  }
}
