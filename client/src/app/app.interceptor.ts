import { HttpInterceptorFn } from "@angular/common/http"

const apiUrl = 'http://localhost:3000/data'
const API = '/api'

export const appInterceptor: HttpInterceptorFn = (req, next) => {


    if (req.url.startsWith(API)) {
      req = req.clone({
        url: req.url.replace(API, apiUrl),
        withCredentials: true
      })
    }
  
    return next(req);
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