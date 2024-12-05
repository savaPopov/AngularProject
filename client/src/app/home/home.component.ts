import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Hike } from '../types/hike';
import { ApiService } from '../api.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  hikes: Hike[] = [];


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getRecentHikes().subscribe((h) => {
      this.hikes = h
      console.log(h)
    })
  }
}
