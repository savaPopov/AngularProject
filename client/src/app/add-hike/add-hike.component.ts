import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-hike',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './add-hike.component.html',
  styleUrl: './add-hike.component.css'
})
export class AddHikeComponent {
  constructor(private apiService: ApiService, private router: Router) { }
  form = new FormGroup({
    title: new FormControl('', [Validators.required,]),
    elavation: new FormControl('', [Validators.required, Validators.minLength(5)]),
    distance: new FormControl('', [Validators.required, Validators.minLength(5)]),
    imageUrl: new FormControl('', [Validators.required, Validators.minLength(5)]),
    mountain: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    location: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })


  create() {
    const { title, elavation, distance, imageUrl, mountain, description, location } = this.form.value
    this.apiService.createHike(title!, elavation!, distance!, imageUrl!, mountain!, description!, location!).subscribe((response) => {
      this.router.navigate(['/catalog'])
      console.log(response)
    })
    console.log(this.form.value)
  }
}
