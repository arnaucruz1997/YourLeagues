import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable} from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class UserResolver implements Resolve<any> {
    constructor(private userService: UserService) {

    }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<any> {
    return this.userService.getUserData();
  }
}