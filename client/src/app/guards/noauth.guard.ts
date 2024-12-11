import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../api/user.service';
import { inject } from '@angular/core';

export const NoAuthGuard: CanActivateFn = () => {
    const userService = inject(UserService);
    const router = inject(Router);

    if (userService.isLogged) {
        // Redirect logged-in users away from login/register pages
        router.navigate(['/']);
        return false;
    }
    return true;
};