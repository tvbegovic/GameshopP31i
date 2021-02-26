import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Settings } from "./settings";

export class TokenInterceptor implements HttpInterceptor { 
    constructor() {

    } 
    
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = localStorage.getItem(Settings.accessTokenKey)!;  
        return next.handle(this.addAuthorizationHeader(req, accessToken));
   }
   
   private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
        // If there is token then add Authorization header otherwise don't change    request
        if (token) {
            return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
        } 
        return request;
    }
}