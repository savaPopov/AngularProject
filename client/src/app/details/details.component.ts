import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Hike } from '../types/hike';
import { UserService } from '../user/user.service';
import { User } from '../types/user';
import { combineLatestWith, of } from 'rxjs';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [HeaderComponent, DeleteModalComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  hike = {} as Hike;
  user = {} as any;
  isLogged: boolean = false;
  isOwner: boolean = false;
  showDeleteModal: boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private userService: UserService) { }



  ngOnInit(): void {
    const id = this.route.snapshot.params['hikeId']
    this.isLogged = this.userService.isLogged;

    if (this.isLogged) {
      this.userService.getProfile().subscribe((profile) => {
        this.user = profile
      })
    }


    this.apiService.getSingleHike(id).subscribe((h) => {
      this.hike = h;
      if (this.user != undefined && this.user._id == this.hike._ownerId) {
        this.isOwner = true
      }
      else {
        this.isOwner = false;
      }

      console.log('ownerId->', h._ownerId)
      console.log('userId->', this.user._id)
      console.log('is it owner?', this.isOwner)
    })

    if (this.user._id == this.hike._ownerId) {
      this.isOwner = true;
    }
  }

  toggleDelete() {
    this.showDeleteModal = !this.showDeleteModal;
  }


}
