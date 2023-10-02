import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //can set new header
        let userId = sessionStorage.getItem("userId");
        if (userId) {
            const authReq = req.clone({
                headers: req.headers.set('userId', userId)
            });
            return next.handle(authReq);
        }

        //can modify header
        //reqCopy.headers.append({ "Content-Type": "multipart/form-data" })

        //can delete header
        //reqCopy.headers.delete("Content-Type")
        return next.handle(req);

    }
}