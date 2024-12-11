import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, HeaderComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {



}
