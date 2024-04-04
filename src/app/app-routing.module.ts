import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SignupComponent } from './signup/signup.component';
import { AddUserComponent } from './add-user/add-user.component';
import { CartComponent } from './cart/cart.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './AuthGuard.service';
import { AuthGuardLogin } from './AuthGuardLogin.service';

const routes: Routes = [
  { path: '', component: HeroSectionComponent },
  { path: 'products', component: ProductComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardLogin] },
  { path: 'edit-product/:productId', component: EditProductComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuardLogin] },
  { path: 'add-user', component: AddUserComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'add-product', component: AddProductComponent },
      { path: 'admin-products', component: ProductListComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'edit-user', component: EditUserComponent },
    ],
  },
  // { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
