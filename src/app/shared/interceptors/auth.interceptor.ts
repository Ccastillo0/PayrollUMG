import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/pages/auth/services/auth.service";
import { Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor( private authService: AuthService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const userToken = this.authService.userToken

        if(userToken){
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer '+userToken,
                },
            });
        }

        return next.handle(req);
    }
}