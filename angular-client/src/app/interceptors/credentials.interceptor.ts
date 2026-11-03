import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

const SERVEUR = environment.apiUrl;
export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(SERVEUR)) {
    return next(req.clone({ withCredentials: true }));
  }
  return next(req);
};