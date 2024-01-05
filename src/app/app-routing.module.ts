import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactusComponent } from './shared/contactus/contactus.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'organization',
    loadChildren: () =>
      import('./components/organization/organization.module').then(
        (m) => m.OrganizationModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./components/products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./components/user-register/user-register.module').then(
        (m) => m.UserRegisterModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule),
  },
  {
    path:'contactus',
    component:ContactusComponent,
    title:"Contact Us - ImgDotPix",
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
