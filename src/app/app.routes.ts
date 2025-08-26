import { Routes, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  return token ? true : router.parseUrl('/login');
};

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { 
    path: 'login', 
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
      data: { animation: 'LoginPage' }   
  },
  { 
    path: 'signup', 
    loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent),
      data: { animation: 'SignupPage' }  

  },

  { 
    path: 'users', 
    loadComponent: () => import('./users/users-list/users-list.component').then(m => m.UsersListComponent), 
    canActivate: [authGuard] 
  },
  { 
    path: 'users/:id', 
    loadComponent: () => import('./users/user-detail/user-detail.component').then(m => m.UserDetailComponent), 
    canActivate: [authGuard] 
  },
  { 
    path: 'users/add', 
   loadComponent: () => import('./users/user-form-dialog/user-form-dialog.component').then(m => m.UserFormDialogComponent),

    canActivate: [authGuard] 
  },

  { path: '**', redirectTo: 'login' }
];
