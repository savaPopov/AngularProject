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

export const routes: Routes = [
    { path: '', component: HomeComponent },
    //User routing
    { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },

    // { path: 'catalog', component: CatalogComponent },

    {
        path: 'catalog', children: [
            { path: '', component: CatalogComponent },
            { path: ':hikeId', component: DetailsComponent }
        ]
    },

    { path: 'edit/:hikeId', component: EditComponent, canActivate: [AuthGuard] },

    { path: 'add-hike', component: AddHikeComponent, canActivate: [AuthGuard] },

];

