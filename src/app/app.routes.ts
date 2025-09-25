import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Core/layouts/blank-layout/blank-layout.component';
import { authGuard } from './Core/guards/Guard-auth/auth-guard';
import { isloggedGuard } from './Core/guards/islogged/islogged-guard';

//  loadComponent:()=>import().then((c)=>c.)

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isloggedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./Core/auth/login/login.component').then(
            (c) => c.LoginComponent
          ),
        title: 'Login page',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./Core/auth/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'Register page',
      },
      {
        path: 'forgetpassword',
        loadComponent: () =>
          import('./Core/auth/forgetpassword/forgetpassword.component').then(
            (c) => c.ForgetpasswordComponent
          ),
        title: 'ForgetPassword page',
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then((c) => c.HomeComponent),
        title: 'home page',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component').then((c) => c.CartComponent),
        title: 'cart page',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/product/product.component').then(
            (c) => c.ProductComponent
          ),
        title: 'products page',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
        title: 'brands page',
      },
      {
        path: 'categoties',
        loadComponent: () =>
          import('./features/categoties/categoties.component').then(
            (c) => c.CategotiesComponent
          ),
        title: 'categoties page',
      },
      {
        path: 'details/:slag/:id',
        loadComponent: () =>
          import('./features/details/details.component').then(
            (c) => c.DetailsComponent
          ),
        title: 'details page',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/details/details.component').then(
            (c) => c.DetailsComponent
          ),
        title: 'details page',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./features/wishlist/wishlist.component').then(
            (c) => c.WishlistComponent
          ),
        title: 'Wish List page',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/allorders/allorders.component').then(
            (c) => c.AllordersComponent
          ),
        title: 'AllOrders page',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./features/checkout/checkout.component').then(
            (c) => c.CheckoutComponent
          ),
        title: 'checkout page',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./features/notfound/notfound.component').then(
            (c) => c.NotfoundComponent
          ),
        title: 'Not-Found Page',
      },
    ],
  },
];
