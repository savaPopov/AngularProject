import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchPasswordsValidator } from '../../utils/match-passwords.validator';
import { emailValidator } from '../../utils/email.validator';
import { UserService } from '../../api/user.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  error: string = '';

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

  constructor(private userService: UserService, private router: Router) { }

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

  passGroupFieldMissing(controlName: string) {
    return (
      this.form.get('passGroup')?.get(controlName)?.touched &&
      this.form.get('passGroup')?.get(controlName)?.errors?.['required']
    )
  }

  passGroupMinLength(controlName: string) {
    return (
      this.form.get('passGroup')?.get(controlName)?.touched &&
      this.form.get('passGroup')?.get(controlName)?.errors?.['minlength']
    )
  }



  register() {
    if (this.form.invalid) {
      return
    }

    const { email, passGroup: { password } = {} } = this.form.value;


    this.userService.register(email!, password!).pipe(
      catchError((err) => {

        console.log(err);
        if (err.error.code == 409) {
          this.error = err.error.message;
        } else {
          this.error = `Unknown Error: ${err.error.message}`
        }



        return of(null) 
      })
    ).subscribe({
      next: (response) => {
        if (response && response.accessToken) {
          const token = response.accessToken;
          this.userService.storeToken(token);
          this.router.navigate(['/']);
        }
      },
    });

  }
}
