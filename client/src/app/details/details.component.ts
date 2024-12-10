import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Hike } from '../types/hike';
import { UserService } from '../user/user.service';
import { User } from '../types/user';
import { combineLatestWith, of } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  hike = {} as Hike;
  user = {} as any;
  isLogged: boolean = false;
  isOwner: boolean = false;
  showDeleteModal: boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private userService: UserService, private router: Router) { }



  // ngOnInit(): void {
  //   const id = this.route.snapshot.params['hikeId']
  //   this.isLogged = this.userService.isLogged;

  //   if (this.isLogged) {
  //     this.userService.getProfile().subscribe((profile) => {
  //       this.user = profile
  //     })
  //   }


  //   this.apiService.getSingleHike(id).subscribe((h) => {
  //     this.hike = h;
  //     if (this.user != undefined && this.user._id == this.hike._ownerId) {
  //       this.isOwner = true
  //     }
  //     else {
  //       this.isOwner = false;
  //     }

  //     console.log('ownerId->', h._ownerId)
  //     console.log('userId->', this.user._id)
  //     console.log('is it owner?', this.isOwner)
  //   })

  //   if (this.user._id == this.hike._ownerId) {
  //     this.isOwner = true;
  //   }
  // }

  ngOnInit(): void {
    const id = this.route.snapshot.params['hikeId'];
    this.isLogged = this.userService.isLogged;

    const hike$ = this.apiService.getSingleHike(id);
    let user$ = of({} as any);

    if (this.isLogged) {
      user$ = this.userService.getProfile();
    }

    hike$.pipe(
      combineLatestWith(user$)
    ).subscribe(([hike, user]) => {
      this.hike = hike;
      this.user = user;

      if (user && user._id === hike._ownerId) {
        this.isOwner = true;
      } else {
        this.isOwner = false;
      }
    });
  }


  toggleDelete() {
    this.showDeleteModal = !this.showDeleteModal;
  }

  onCancel(event: Event) {
    event.preventDefault()
    console.log('On cancel Invoked')
    this.toggleDelete()
  }

  onConfirm(event: Event) {
    event.preventDefault()
    if (this.hike._ownerId == this.user._id) {
      this.apiService.remove(this.hike._id).subscribe(() => {
        this.toggleDelete()
        this.router.navigate(['/catalog'])
      })
    }
  }


}
