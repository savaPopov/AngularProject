import { HttpInterceptorFn } from "@angular/common/http"
import { catchError, throwError } from "rxjs";

const apiUrl = 'http://localhost:3030/users'
const API = '/api'

export const appInterceptor: HttpInterceptorFn = (req, next) => {


    if (req.url.startsWith(API)) {
        req = req.clone({
            url: req.url.replace(API, apiUrl),
            withCredentials: true
        })
    }

    return next(req)

    //   return next(req).pipe(
    //     catchError((err) => {
    //     //   console.log(err.message);
    //       // Return an empty observable or rethrow the error to prevent further propagation
    //     //   console.log
    //       return throwError(() => new Error(err.status));
    //     })
    //   );

    // const errorMsgService = inject(ErrorMsgService)
    // const router = inject(Router)

    // return next(req).pipe(
    //   catchError((err) => {
    //     if (err.status === 401) {
    //       router.navigate(['/home'])
    //     } else {
    //       errorMsgService.setError(err)
    //       router.navigate(['/error'])
    //     }

    //     return [err]
    //   })
    // );
};