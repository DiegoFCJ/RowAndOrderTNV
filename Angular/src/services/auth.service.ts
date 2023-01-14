import { Injectable } from '@angular/core';
import { LoginDTO, RegisterDTO, UserFull } from 'src/models/user';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  springBootUrl: string = 'http://localhost:8080/api/public';

  constructor(private http: HttpClient) {}

  login(loginData: LoginDTO) {
    return this.http.post<Partial<LoginDTO>>(`${this.springBootUrl}/signIn`, loginData);
  }

  register(registerData: RegisterDTO) {
    window.location.reload();
    return this.http.post<RegisterDTO>(`${this.springBootUrl}/signUp`,registerData);
  }

  logout() {
    localStorage.removeItem('user');
  } 

  isAuthenticated() {
    return localStorage.getItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || '/home') as UserFull;
  }

  saveUserInLocalStorage(loginData: Partial<LoginDTO>) {
    localStorage.setItem('user', JSON.stringify(loginData));
    return of('login ok');
  }
}
