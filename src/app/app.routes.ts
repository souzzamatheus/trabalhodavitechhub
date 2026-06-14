import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { HomePage } from './pages/home/home-page';
import { LoginPage } from './pages/login/login-page';
import { ProductDetailPage } from './pages/product-detail/product-detail-page';
import { ProfilePage } from './pages/profile/profile-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomePage },
  { path: 'produto/:id', component: ProductDetailPage },
  { path: 'login', component: LoginPage },
  { path: 'perfil', component: ProfilePage, canActivate: [authGuard] },
  { path: '**', redirectTo: 'home' }
];
