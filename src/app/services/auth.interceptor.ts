import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  let headersConfig: Record<string, string> = {
    'x-api-key': 'reqres-free-v1'
  };

  const token = authService.getToken();
  if (token) {
    headersConfig['Authorization'] = `Bearer ${token}`;
  }

  const cloned = req.clone({ setHeaders: headersConfig });
  return next(cloned);
};
