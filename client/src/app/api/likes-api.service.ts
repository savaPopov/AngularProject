import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const BASE_URL = 'http://localhost:3030/data/likes'

@Injectable({
  providedIn: 'root'
})
export class LikesApiService {

  constructor(private http: HttpClient, private userService: UserService) { }

  like(hikeId: string) {
    const token = this.userService.getToken()
    const headers = new HttpHeaders().set('X-Authorization', `${token}`)

    return this.http.post(`${BASE_URL}`, { hikeId }, { headers })

  }

  getAllLikes(hikeId: string) {
    const params = new URLSearchParams({
      where: `hikeId="${hikeId}"`,
      load: `author=_ownerId:users`,
    })

    return this.http.get(`${BASE_URL}?${params.toString()}`)
  }


}
