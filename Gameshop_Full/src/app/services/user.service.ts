import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "../domainclasses";
import { LoginResult } from "../modelclasses";
import { HttpService } from "./http.service";
import { Settings } from "./settings";

@Injectable()
export class UserService {

    constructor(private httpService: HttpService) {

    }

    api = 'api/user/';
    

    public userSetEvent: EventEmitter<any> = new EventEmitter();
    private _user!: User | null;
    get User() {
        if (this._user == null) {
        this._user = this.loadUser();
        }
        return this._user;
    }

    login(email: string, password: string) {
        return this.httpService.get(this.api + 'login', { params: { email, password}});
    }

    logout() {
        return this.httpService.post(this.api + 'logout', null);
    }

    userKey = 'gameshop_user';    

    /*getCurrentUser(): Observable<User> {
        return this.httpService.post<User>(this.api + 'getCurrent', null).pipe(
        tap({
            next: (u: any) => this.saveUser(u)
        })
        );
    } */ 

    loadUser() {
        const sUser = localStorage.getItem(this.userKey);
        if (sUser != null) {
        return JSON.parse(sUser);
        }
        return null;
    }

    saveLoginData(data: LoginResult) {
        this._user = data.user;
        localStorage.setItem(this.userKey, JSON.stringify(this._user));    
        localStorage.setItem(Settings.accessTokenKey, data.accessToken);
        localStorage.setItem(Settings.refreshTokenKey, data.refreshToken);
        this.userSetEvent.emit(data.user);
    }

    clearUser() {
        localStorage.removeItem(this.userKey);    
        localStorage.removeItem(Settings.accessTokenKey);
        localStorage.removeItem(Settings.refreshTokenKey);
        this._user = null;
        this.userSetEvent.emit(null);
    }

  
  updateUser(user: User): Observable<User> {
    const url = user.id > 0 ? 'update' : 'create';
    return this.httpService.post<User>(this.api + url, user);
  }
    

  deleteUser(id: number) {
    return this.httpService.delete(this.api + 'delete?id=' + id);
  }
}