import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO, RegisterDTO, User, UserLocalSt } from 'src/models/user';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}
  springBootUrl = 'http://localhost:8080/api/public';

  login(loginData: LoginDTO) {
    console.log('auth service.ts', loginData);
    return this.http.post<Partial<LoginDTO>>(
      `${this.springBootUrl}/signIn`,
      loginData
    );
  }

  saveUserInLocalStorage(loginData: Partial<LoginDTO>) {
    localStorage.setItem('user', JSON.stringify(loginData));
    return of('login ok');
  }

  register(registerData: RegisterDTO) {
    window.location.reload()
    this.router.navigateByUrl('/sign');
    return this.http.post<RegisterDTO>(`${this.springBootUrl}/signUp`,registerData);
  }

  logout() {
    localStorage.removeItem('user');
  } 

  isAuthenticated() {
    return !!localStorage.getItem('user');
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user') || '') as UserLocalSt;
    return user;
  }
}
