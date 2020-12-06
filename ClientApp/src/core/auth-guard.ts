import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../app/service/user-service.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.authService.getAuthToken();
    if (token) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
