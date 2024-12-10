import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Hike } from '../types/hike';
import { UserService } from '../user/user.service';
import { User } from '../types/user';
import { combineLatest, combineLatestWith, of } from 'rxjs';
import { MapComponent } from "./google-maps/google-maps.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [HeaderComponent, RouterLink, MapComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  hike = {} as Hike;
  user = {} as any;
  likes = [] as any

  isLogged: boolean = false;
  isOwner: boolean = false;
  hasLiked: boolean = false;
  showDeleteModal: boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['hikeId'];
    this.isLogged = this.userService.isLogged;

    const likes$ = this.apiService.getAllLikes(id)
    const hike$ = this.apiService.getSingleHike(id);
    let user$ = of({} as any);

    if (this.isLogged) {
      user$ = this.userService.getProfile();
    }


    combineLatest([likes$, hike$, user$]).subscribe(([likes, hike, user]) => {
      this.hike = hike
      this.user = user
      this.likes = likes


      if (user && user._id === hike._ownerId) {
        this.isOwner = true;
      }

      this.hasLiked = this.likes.some((x: any) => x._ownerId == this.user._id)
      console.log(this.user._id)
      console.log(this.hasLiked)
      console.log(this.likes.length)

      console.log(this.likes)
    })

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

  handleLikeBtn() {
    this.apiService.like(this.hike._id).subscribe((response) => {
      console.log(response)
      this.likes = [...this.likes, response]

      this.hasLiked = true

    })
  }


}
