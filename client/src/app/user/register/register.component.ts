import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchPasswordsValidator } from '../../utils/match-passwords.validator';
import { emailValidator } from '../../utils/email.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, emailValidator()]),
    passGroup: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      rePassword: new FormControl('', [Validators.required]),
    },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')]
      }
    )
  })

  isFieldTextMissing(controlName: string) {

    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['required']
    )

  }

  isEmailNotValid() {
    return (
      this.form.get('email')?.touched &&
      this.form.get('email')?.errors?.['emailValidator']
    )
  }

  get passGroup() {
    return this.form.get('passGroup')
  }

   passGroupFieldMissing(controlName:string) {
    return (
      this.form.get('passGroup')?.get(controlName)?.touched && 
      this.form.get('passGroup')?.get(controlName)?.errors?.['required']
    )
  }

  passGroupMinLength(controlName:string){
    return(
      this.form.get('passGroup')?.get(controlName)?.touched && 
      this.form.get('passGroup')?.get(controlName)?.errors?.['minlength']
    )
  }



  register() {
    if (this.form.invalid) {
      return
    }

    console.log(this.form.value)
  }
}
