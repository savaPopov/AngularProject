import { Injectable } from "@angular/core";
import { Hike } from "./types/hike";
import { HttpClient } from '@angular/common/http'
// import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:3030/data/hikes';

@Injectable({
    providedIn: 'root'
})
export class ApiService {


    constructor(private http: HttpClient) { }


    getHikes() {

        return this.http.get<Hike[]>(URL)
    }

    getRecentHikes() {
        return this.http.get<Hike[]>('http://localhost:3030/data/hikes?sortBy=_createdOn%20desc&pageSize=3')
    }

}