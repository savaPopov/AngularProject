import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Hike } from '../types/hike';
import { ApiService } from '../api.service';
import { RouterLink } from '@angular/router';
import { UserService } from '../user/user.service';
import { UserForAuth } from '../types/user';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  hikes: Hike[] = [];
  profile = {};


  constructor(private apiService: ApiService, private userService: UserService) { }

  ngOnInit(): void {
    // this.userService.getProfile().subscribe((response) => {
    //   this.profile = response;
    //   console.log(response)
    // })

    this.apiService.getRecentHikes().subscribe((h) => {
      this.hikes = h
      console.log(h)
    })


  }
}
