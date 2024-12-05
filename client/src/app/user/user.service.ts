import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { UserForAuth } from '../types/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    
    private user$$ = new BehaviorSubject<UserForAuth | null>(null)
    private user$ = this.user$$.asObservable()

    USER_KEY = '[user]';
    user: UserForAuth | null = null;

    get isLogged(): boolean {
        return !!this.user;
    }


    constructor(private http: HttpClient) {
        this.user$.subscribe((user) => { this.user = user })
    }

    login(email: string, password: string) {

        return this.http
            .post<UserForAuth>('/api/login', { email, password })
            .pipe(tap((user) => this.user$$.next(user)));
    }

    logout() {
        return this.http
            .post('/api/logout', {})
            .pipe(tap((user) => this.user$$.next(null)));
    }

    register(username: string, email: string, tel: string, password: string, rePassword: string) {

        return this.http
            .post<UserForAuth>('/api/register', { username, email, tel, password, rePassword })
            .pipe(tap((user) => this.user$$.next(user)));
    }



}