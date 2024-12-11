import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../api/user.service";
import { inject } from "@angular/core";

export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const userService = inject(UserService)
    const router = inject(Router)

    if (userService.isLogged) {
        return true
    }
    router.navigate(['/login'])
    return false;
}