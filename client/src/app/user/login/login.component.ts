import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../utils/email.validator';
import { UserService } from '../../api/user.service';
import { Router, RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  error: string = '';
  form = new FormGroup({
    email: new FormControl('', [Validators.required, emailValidator()]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),

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

  isMinLength() {
    return (
      this.form.get('password')?.touched &&
      this.form.get('password')?.errors?.['minlength']
    )
  }


  login() {
    if (this.form.invalid) {
      return
    }

    const { email, password } = this.form.value;


    this.userService.login(email!, password!).pipe(
      catchError((err) => {

        if (err.error.code == 403) {
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
