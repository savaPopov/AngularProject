import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../api/data.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Hike } from '../types/hike';
import { UserService } from '../api/user.service';
import { User } from '../types/user';
import { combineLatest, of } from 'rxjs';
import { MapComponent } from "./google-maps/google-maps.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsApiService } from '../api/comments-api.service';
import { LikesApiService } from '../api/likes-api.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [HeaderComponent, RouterLink, MapComponent, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  hike = {} as Hike;
  user = {} as any;
  likes = [] as any;
  comments = [] as any;

  isLogged: boolean = false;
  isOwner: boolean = false;
  hasLiked: boolean = false;
  showDeleteModal: boolean = false;

  form = new FormGroup({
    comment: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
  })

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private commentsApi: CommentsApiService,
    private likesApi: LikesApiService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['hikeId'];
    this.isLogged = this.userService.isLogged;


    const comments$ = this.commentsApi.getAllComments(id)
    const likes$ = this.likesApi.getAllLikes(id)
    const hike$ = this.apiService.getSingleHike(id);
    let user$ = of({} as any);

    if (this.isLogged) {
      user$ = this.userService.getProfile();
    }


    combineLatest([likes$, hike$, comments$, user$]).subscribe(([likes, hike, comments, user]) => {

      this.comments = comments
      this.hike = hike
      this.user = user
      this.likes = likes


      if (user && user._id === hike._ownerId) {
        this.isOwner = true;
      }

      this.hasLiked = this.likes.some((x: any) => x._ownerId == this.user._id)

    })

  }


  toggleDelete() {
    this.showDeleteModal = !this.showDeleteModal;
  }

  onCancel(event: Event) {
    event.preventDefault()
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
    this.likesApi.like(this.hike._id).subscribe((response) => {
      console.log(response)
      this.likes = [...this.likes, response]

      this.hasLiked = true

    })
  }

  createComment() {

    if (this.form.invalid) {
      return
    }

    const { comment } = this.form.value
    console.log(comment)

    this.commentsApi.createComment(this.hike._id, comment!).subscribe((response) => {
      const newComment = { ...response, author: { email: this.user.email } }
      this.comments = [...this.comments, newComment]

      this.form.patchValue({
        comment: '',

      })
    })
  }


}
