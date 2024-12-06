import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const checkLoggingStatus = this.userService.isLogged
    console.log('ARE YOU LOGGED?', checkLoggingStatus)
    this.isLogged = checkLoggingStatus;
  }

  logout() {
    this.userService.logout().subscribe((response) => {
      console.log('RESPONSEEEEEEEEEEE')
      console.log(response)
      this.userService.deleteToken()
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      })
    })
  }


}
