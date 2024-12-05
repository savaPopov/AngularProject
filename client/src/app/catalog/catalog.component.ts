import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { Hike } from '../types/hike';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  hikes: Hike[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getHikes().subscribe((h) => {
      this.hikes = h
      console.log(h)
    })
  }

}
