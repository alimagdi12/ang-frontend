import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  product: any;
  products: any[] = [];
  totalPrice: number = 0;

  componentSubscriptions = new Subscription();
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userService:UserService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.params['id'];
    console.log(productId);

    this.activatedRoute.params.subscribe({
      next: () => {
        this.productService.getProductById(productId).subscribe({
          next: (data) => {
            this.product = data;
          },
        });
      },
    });
    this.userService.getCart().subscribe(
      (response: any) => {
        this.products = response.products;
        console.log(response);
       
        this.totalPrice = response.totalPrice;

        console.log(this.totalPrice);
        
      },
      (error: any) => {
        console.error(error);
        alert('Error fetching cart data');
      }
    );
  }
  addToCart(productId: string): void {
    this.userService.addToCart(productId).subscribe(
      (response: any) => {
        console.log(response);
        this._snackBar.open('Product added to cart', 'Close', {
          duration: 3000,
        });
      },
      (error: any) => {
        console.error(error);
        this._snackBar.open('Error adding product to cart', 'Close', {
          duration: 3000,
        });
      }
    );
  }
  ///////////////////////////////////////////////////////////
  increaseQuantity(productId: string) {
    this.userService.increaseQuantity(productId).subscribe(
      (response: any) => {
        // Find the product in the products array
        const productIndex = this.products.findIndex(
          (product) => product.productId._id === productId
        );
        if (productIndex !== -1) {
          // Increase the quantity and update the total price
          this.products[productIndex].quantity++;
          this.products[productIndex].totalPrice +=
            this.products[productIndex].productId.price;
          this.totalPrice += this.products[productIndex].productId.price;
        }
      },
      (error: any) => {
        console.error(error);
        // Handle error
      }
    );
  }

  decreaseQuantity(productId: string) {
    this.userService.decreaseQuantity(productId).subscribe(
      (response: any) => {
        // Find the product in the products array
        const productIndex = this.products.findIndex(
          (product) => product.productId._id === productId
        );
        if (productIndex !== -1 && this.products[productIndex].quantity > 1) {
          // Decrease the quantity and update the total price
          this.products[productIndex].quantity--;
          this.products[productIndex].totalPrice -=
            this.products[productIndex].productId.price;
          this.totalPrice -= this.products[productIndex].productId.price;
        }
      },
      (error: any) => {
        console.error(error);
        // Handle error
      }
    );
  }
}
