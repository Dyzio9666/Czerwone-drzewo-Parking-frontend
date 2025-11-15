import { HttpInterceptorFn } from "@angular/common/http";


export const authInterceptor : HttpInterceptorFn = (req , next) => {
    const authRequest = req.clone({
        setHeaders : {
            Authorization : `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return next(req);
}