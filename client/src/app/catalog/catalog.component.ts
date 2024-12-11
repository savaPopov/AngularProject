import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterLink } from '@angular/router';
import { ApiService } from '../api/data.service';
import { Hike } from '../types/hike';
import { FormsModule } from '@angular/forms';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [HeaderComponent, RouterLink, FormsModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  hikes: Hike[] = [];
  filteredHikes: Hike[] = [];
  searchTerm: string = '';

  constructor(private apiService: ApiService,private userService: UserService) { }

  ngOnInit(): void {
    this.apiService.getHikes().subscribe((h) => {
      this.hikes = h;
      this.filteredHikes = h;
      // console.log(h)
      const token = this.userService.getToken()
      // console.log(token)
    })
  }

  filterHikes() {
    if (this.searchTerm.length >= 2) {
      this.filteredHikes = this.filteredHikes.filter((hike) => hike.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
    } else {
      this.filteredHikes = this.hikes;
    }

  }

}
