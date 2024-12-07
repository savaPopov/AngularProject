import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  constructor(private apiService: ApiService){}

  

  ngOnInit(): void {

  }
}
