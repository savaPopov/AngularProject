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

    getSingleHike(id: string) {
        return this.http.get<Hike>(`http://localhost:3030/data/hikes/${id}`)
    }

    remove(id: string) {
        const token = this.userService.getToken();  // Retrieve the token from local storage
        const headers = new HttpHeaders().set('X-Authorization', `${token}`);
        return this.http.delete(`http://localhost:3030/data/hikes/${id}`, { headers })
    }

    updateHike(hikeId: string, title: string, elavation: string, distance: string, imageUrl: string, mountain: string, description: string, location: string) {
        const token = this.userService.getToken()
        const headers = new HttpHeaders().set('X-Authorization', `${token}`)
        const payload = { title, elavation, distance, imageUrl, mountain, description, location };
        return this.http.put(`http://localhost:3030/data/hikes/${hikeId}`, payload, { headers })
    }

    like(hikeId: string) {
        const token = this.userService.getToken()
        const headers = new HttpHeaders().set('X-Authorization', `${token}`)

        return this.http.post(`http://localhost:3030/data/likes`, { hikeId }, { headers })

    }

    getAllLikes(hikeId: string) {
        const params = new URLSearchParams({
            where: `hikeId="${hikeId}"`,
            load: `author=_ownerId:users`,
        })

        return this.http.get(`http://localhost:3030/data/likes?${params.toString()}`)
    }

    createComment(hikeId: string, text: string) {
        const token = this.userService.getToken()
        const headers = new HttpHeaders().set('X-Authorization', `${token}`)

        return this.http.post(`http://localhost:3030/data/comments`, { hikeId, text }, { headers })
    }

    getAllComments(hikeId: string) {
        const params = new URLSearchParams({
            where: `hikeId="${hikeId}"`,
            load: `author=_ownerId:users`,
        })

        return this.http.get(`http://localhost:3030/data/comments?${params.toString()}`)
    }



}