import { HttpInterceptorFn } from "@angular/common/http"


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
};