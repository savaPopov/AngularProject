import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';


const BASE_URL = 'http://localhost:3030/data/comments'

@Injectable({
  providedIn: 'root'
})
export class CommentsApiService {

  constructor(private http: HttpClient, private userService: UserService) { }

  createComment(hikeId: string, text: string) {
    const token = this.userService.getToken()
    const headers = new HttpHeaders().set('X-Authorization', `${token}`)

    return this.http.post(`${BASE_URL}`, { hikeId, text }, { headers })
  }

  getAllComments(hikeId: string) {
    const params = new URLSearchParams({
      where: `hikeId="${hikeId}"`,
      load: `author=_ownerId:users`,
    })

    return this.http.get(`${BASE_URL}?${params.toString()}`)
  }

}
