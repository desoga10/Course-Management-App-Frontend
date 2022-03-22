import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'https://course-mamagement-app.herokuapp.com';

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(user: any) {
    return this.http.post(`${this.baseURL}/api/register`, user);
  }

  loginUser(user: any) {
    return this.http.post(`${this.baseURL}/api/login`, user);
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('token') as string;
    return user !== null ? true : false;
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}
