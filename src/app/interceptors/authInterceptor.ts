import { HttpInterceptorFn } from "@angular/common/http";


export const authInterceptor : HttpInterceptorFn = (req , next) => {
    console.log('interceptor works');
    const authRequest = req.clone({
        setHeaders : {
            Authorization : `Bearer ${localStorage.getItem('accessToken')}`
        }
    });

    return next(authRequest);
}