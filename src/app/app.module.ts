import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SignupComponent } from './signup/signup.component';
import { AddUserComponent } from './add-user/add-user.component';
import { CartComponent } from './cart/cart.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { ProductComponent } from './product/product.component';
import { FeatureComponent } from './feature/feature.component';
import { BannerComponent } from './banner/banner.component';
import { FactComponent } from './fact/fact.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { PaymentComponent } from './payment/payment.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { SuccessComponent } from './success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    LoginComponent,
    EditProductComponent,
    AddProductComponent,
    EditUserComponent,
    SignupComponent,
    AddUserComponent,
    CartComponent,
    HeroSectionComponent,
    ProductComponent,
    FeatureComponent,
    BannerComponent,
    FactComponent,
    ProductDetailsComponent,
    DashboardComponent,
    FooterComponent,
    PaymentComponent,
    SuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    NgxPayPalModule,
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
