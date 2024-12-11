import { Injectable } from "@angular/core";
import { Hike } from "../types/hike";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserService } from "./user.service";


const BASE_URL = 'http://localhost:3030/data/hikes';

@Injectable({
    providedIn: 'root'
})
export class ApiService {


    constructor(private http: HttpClient, private userService: UserService) { }


    getHikes() {

        return this.http.get<Hike[]>(BASE_URL)
    }

    getRecentHikes() {
        return this.http.get<Hike[]>(`${BASE_URL}?sortBy=_createdOn%20desc&pageSize=3`)
    }

    createHike(title: string, elavation: string, distance: string, imageUrl: string, mountain: string, description: string, location: string) {

        const token = this.userService.getToken()

        const payload = { title, elavation, distance, imageUrl, mountain, description, location };
        const headers = new HttpHeaders().set('X-Authorization', `${token}`)
        return this.http.post<Hike>(BASE_URL, payload, { headers })
    }

    getSingleHike(id: string) {
        return this.http.get<Hike>(`${BASE_URL}/${id}`)
    }

    remove(id: string) {
        const token = this.userService.getToken();
        const headers = new HttpHeaders().set('X-Authorization', `${token}`);
        return this.http.delete(`${BASE_URL}/${id}`, { headers })
    }

    updateHike(hikeId: string, title: string, elavation: string, distance: string, imageUrl: string, mountain: string, description: string, location: string) {
        const token = this.userService.getToken()
        const headers = new HttpHeaders().set('X-Authorization', `${token}`)
        const payload = { title, elavation, distance, imageUrl, mountain, description, location };
        return this.http.put(`${BASE_URL}/${hikeId}`, payload, { headers })
    }




}