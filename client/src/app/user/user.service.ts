import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserForAuth } from '../types/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private loginUrl = 'http://localhost:3030/users/login';

    private user$$ = new BehaviorSubject<UserForAuth | null>(null)
    private user$ = this.user$$.asObservable()

    USER_KEY = '[user]';
    user: UserForAuth | null = null;

    get isLogged(): boolean {
        return !!this.getToken();
    }


    constructor(private http: HttpClient) {
        this.user$.subscribe((user) => { this.user = user })
    }

    // login(email: string, password: string) {

    //     return this.http
    //         .post<UserForAuth>('/api/login', { email, password })
    //         .pipe(tap((user) => this.user$$.next(user)));
    // }

    login(email: string, password: string): Observable<any> {
        return this.http.post(this.loginUrl, { email, password });
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

    logout() {
        const token = this.getToken();  // Retrieve the token from local storage
        const headers = new HttpHeaders().set('X-Authorization', `${token}`);

        return this.http.get('http://localhost:3030/users/logout', { headers })

    }
    getProfile() {
        const token = this.getToken();  // Retrieve the token from local storage
        const headers = new HttpHeaders().set('X-Authorization', `${token}`);

        return this.http.get('http://localhost:3030/users/me', { headers });
    }

    register(email: string, password: string,) {

        return this.http.post<any>('http://localhost:3030/users/register', { email, password, })
    }



}