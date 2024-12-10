import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { Hike } from '../types/hike';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }
  hike = {} as Hike;
  //TODO add validation
  form = new FormGroup({
    title: new FormControl('', [Validators.required,]),
    elavation: new FormControl('', [Validators.required, Validators.minLength(5)]),
    distance: new FormControl('', [Validators.required, Validators.minLength(5)]),
    imageUrl: new FormControl('', [Validators.required, Validators.minLength(5)]),
    mountain: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    location: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })


  ngOnInit(): void {
    const hikeId = this.route.snapshot.params['hikeId']

    this.apiService.getSingleHike(hikeId).subscribe((hike) => {
      this.hike = hike
      this.form.patchValue({
        title: hike.title,
        elavation: hike.elavation,
        distance: hike.distance,
        imageUrl: hike.imageUrl,
        mountain: hike.mountain,
        description: hike.description,
        location: hike.location
      })
    })
  }

  update() {
    const { title, elavation, distance, imageUrl, mountain, description, location } = this.form.value
    this.apiService.updateHike(this.hike._id, title!, elavation!, distance!, imageUrl!, mountain!, description!, location!).subscribe((response) => {
      this.router.navigate([`catalog/${this.hike._id}`])
    })


  }

}
