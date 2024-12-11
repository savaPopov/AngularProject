import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { coordinatesValidator } from '../utils/coordinates.validator';
import { httpUrlValidator } from '../utils/httpUrl.validator';

@Component({
  selector: 'app-add-hike',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './add-hike.component.html',
  styleUrl: './add-hike.component.css'
})
export class AddHikeComponent {
  //TODO add validation
  constructor(private apiService: ApiService, private router: Router) { }
  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    elavation: new FormControl('', [Validators.required, Validators.max(10000), Validators.min(0)]),
    distance: new FormControl('', [Validators.required, Validators.max(1000), Validators.min(0)]),
    imageUrl: new FormControl('', [Validators.required, Validators.minLength(5), httpUrlValidator()]),
    mountain: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    location: new FormControl('', [Validators.required, Validators.minLength(5), coordinatesValidator()]),
  })


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


  create() {
    console.log(this.form.value)
    console.log(this.form.invalid)
    if (this.form.invalid) {
      return
    }

    const { title, elavation, distance, imageUrl, mountain, description, location } = this.form.value
    this.apiService.createHike(title!, elavation!, distance!, imageUrl!, mountain!, description!, location!).subscribe((response) => {
      this.router.navigate(['/catalog'])
      console.log(response)
    })
    console.log(this.form.value)
  }
}
