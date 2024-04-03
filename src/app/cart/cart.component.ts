import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any[] = [];
  totalPrice: number = 0;
  stripePaymentLink: string = '';
  selectedOption: number = 1;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getCart().subscribe(
      (response: any) => {
        this.products = response.products;
        this.totalPrice = response.totalPrice;
      },
      (error: any) => {
        console.error(error);
        alert('Error fetching cart data');
      }
    );
  }

  deleteCart(productId: string) {
    console.log(productId);

    this.userService.removeFromCart(productId).subscribe(
      (response: any) => {
        this.products = response.products;
        this.totalPrice = response.totalPrice;
      },
      (error: any) => {
        console.error(error);
        alert('Error deleting product from cart');
      }
    );
  }

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
  // selectedOption: number = 1;

  handleRadioButtonSelection(option: number) {
    this.selectedOption = option;
    console.log(this.selectedOption);
  }

  navigateTopaypal() {
    this.router.navigate(['/']);
  }
  fetchStripePaymentLink(totalPrice: number) {
    this.userService.getStripePaymentLink(totalPrice).subscribe(
      (response: any) => {
        this.stripePaymentLink = response.url;
        window.open(this.stripePaymentLink, '_blank');
      },
      (error: any) => {
        console.error(error);
        alert('Error fetching Stripe payment link');
      }
    );
  }
  paymentMethod() {
    this.handleRadioButtonSelection(this.selectedOption);

    if (this.selectedOption === 1) {
      this.fetchStripePaymentLink(this.totalPrice);
    } else if (this.selectedOption === 2) {
      this.navigateTopaypal();
    }
  }
}
