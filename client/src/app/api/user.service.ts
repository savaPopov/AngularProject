import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';;


const BASE_URL = 'http://localhost:3030/users'
@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {

    }

    //TOKEN MANAGMENT

    get isLogged(): boolean {
        return !!this.getToken();
    }

    storeToken(token: string) {
        localStorage.setItem('authToken', token);
    }

    getToken() {
        return localStorage.getItem('authToken');
    }

    deleteToken() {
        return localStorage.removeItem('authToken')
    }


    //API
    
    login(email: string, password: string): Observable<any> {
        return this.http.post(`${BASE_URL}/login`, { email, password });
    }

    logout() {
        const token = this.getToken();
        const headers = new HttpHeaders().set('X-Authorization', `${token}`);

        return this.http.get(`${BASE_URL}/logout`, { headers })

    }
    getProfile() {
        const token = this.getToken();
        const headers = new HttpHeaders().set('X-Authorization', `${token}`);

        return this.http.get(`${BASE_URL}/me`, { headers });
    }

    register(email: string, password: string,) {

        return this.http.post<any>(`${BASE_URL}/register`, { email, password, })
    }



}