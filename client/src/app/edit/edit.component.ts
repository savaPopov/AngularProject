import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { Hike } from '../types/hike';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/data.service';
import { UserService } from '../api/user.service';
import { User } from '../types/user';
import { combineLatestWith } from 'rxjs';
import { coordinatesValidator } from '../utils/coordinates.validator';
import { httpUrlValidator } from '../utils/httpUrl.validator';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, private userService: UserService) { }
  hike = {} as Hike;
  user = {} as any

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    elavation: new FormControl('', [Validators.required, Validators.max(10000), Validators.min(0)]),
    distance: new FormControl('', [Validators.required, Validators.max(1000), Validators.min(0)]),
    imageUrl: new FormControl('', [Validators.required, Validators.minLength(5), httpUrlValidator()]),
    mountain: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    location: new FormControl('', [Validators.required, Validators.minLength(5), coordinatesValidator()]),
  })


  ngOnInit(): void {
    const hikeId = this.route.snapshot.params['hikeId']

    const hike$ = this.apiService.getSingleHike(hikeId)
    const user$ = this.userService.getProfile()


    hike$.pipe(combineLatestWith(user$)).subscribe(([hike, user]) => {
      this.user = user
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

      if (this.user._id != this.hike._ownerId) {
        this.router.navigate(['/catalog'])
      }
    })


  }

  isFieldTextMissing(controlName: string) {

    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['required']
    )

  }

  fieldMinLength(controlName: string) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['minlength']
    )
  }

  fieldMaxNumber(controlName: string) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['max']
    )
  }

  fieldMinNumber(controlName: string) {
    return (this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['min'])
  }

  coordinatesError() {


    return (
      this.form.get('location')?.touched &&
      this.form.get('location')?.errors?.['coordinatesValidator']
    )
  }

  isHttpValid() {
    return (
      this.form.get('imageUrl')?.touched &&
      this.form.get('imageUrl')?.errors?.['httpUrlValidator']
    )
  }


  update() {
    const { title, elavation, distance, imageUrl, mountain, description, location } = this.form.value
    this.apiService.updateHike(this.hike._id, title!, elavation!, distance!, imageUrl!, mountain!, description!, location!).subscribe((response) => {
      this.router.navigate([`catalog/${this.hike._id}`])
    })


  }

}
