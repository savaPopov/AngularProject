import { Injectable } from "@angular/core";
import { Hike } from "./types/hike";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserService } from "./user/user.service";
// import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:3030/data/hikes';

@Injectable({
    providedIn: 'root'
})
export class ApiService {


    constructor(private http: HttpClient, private userService: UserService) { }


    getHikes() {

        return this.http.get<Hike[]>(URL)
    }

    getRecentHikes() {
        return this.http.get<Hike[]>('http://localhost:3030/data/hikes?sortBy=_createdOn%20desc&pageSize=3')
    }

    createHike(title: string, elavation: string, distance: string, imageUrl: string, mountain: string, description: string, location: string) {

        const token = this.userService.getToken()

        const payload = { title, elavation, distance, imageUrl, mountain, description, location };
        const headers = new HttpHeaders().set('X-Authorization', `${token}`)
        return this.http.post<Hike>(`http://localhost:3030/data/hikes`, payload, { headers })
    }

    getSingleHike(id:string){
        return this.http.get<Hike>(`http://localhost:3030/data/hikes/${id}`)
    }

}