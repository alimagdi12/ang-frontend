import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any[] = [];
  totalPrice: number = 0;

  constructor(
    private userService: UserService,
    private productService: ProductService
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
      const productIndex = this.products.findIndex(product => product.productId._id === productId);
      if (productIndex !== -1) {
        // Increase the quantity and update the total price
        this.products[productIndex].quantity++;
        this.products[productIndex].totalPrice += this.products[productIndex].productId.price;
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
      const productIndex = this.products.findIndex(product => product.productId._id === productId);
      if (productIndex !== -1 && this.products[productIndex].quantity > 1) {
        // Decrease the quantity and update the total price
        this.products[productIndex].quantity--;
        this.products[productIndex].totalPrice -= this.products[productIndex].productId.price;
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

// getTotalPrice(): number {
//   let totalPrice = 0;
//   for (const product of this.products) {
//     totalPrice += product.quantity * product.productId.price;
//   }
//   return totalPrice;
// }
