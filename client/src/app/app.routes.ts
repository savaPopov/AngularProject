import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AddHikeComponent } from './add-hike/add-hike.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/noauth.guard';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    //User routing
    { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },



    {
        path: 'catalog', children: [
            { path: '', component: CatalogComponent },
            { path: ':hikeId', component: DetailsComponent }
        ]
    },

    //TODO 404 About  Pages 

    { path: 'edit/:hikeId', component: EditComponent, canActivate: [AuthGuard] },

    { path: 'add-hike', component: AddHikeComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutUsComponent },


    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' },
];

