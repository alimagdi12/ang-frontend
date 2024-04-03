import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router service
import { ProductService } from '../product.service';
import { Product } from './product.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService,private userService : UserService, private router: Router) { } // Inject the Router service here

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((data: any) => {
      console.log(data); // Log the response data
      this.products = data.data;
    });
  }

  editProduct(productId: string): void {
  this.router.navigate(['/edit-product', productId]);
  }



  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.getProducts();
    });
  }


  addToCart(productId: string): void {
    this.userService.addToCart(productId).subscribe(
      (response: any) => {
        console.log(response);
        alert('Product added to cart');
      },
      (error: any) => {
        console.error(error);
        alert('Error adding product to cart');
      }
    );
  }
}
