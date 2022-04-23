import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable({ providedIn: 'root'})
export class NavbarResolverService implements Resolve<any>{
    public userService:UserService;
    resolve():Observable<any>{
        return of(this.userService.getUserData());       
    }
}