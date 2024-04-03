import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product-list/product.interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Product = {
    _id:'',
    category: '',
    title: '',
    price: 0,
    description: '',
    details: '',
    imageUrl: '',
    rating: 0
  };

  constructor(private router: Router, private productService: ProductService, private snackBar: MatSnackBar) { }

  onSubmit(): void {
  this.productService.addProduct(this.product).subscribe(() => {
    this.snackBar.open('Product added successfully', 'Close', {
      duration: 2000 // Duration in milliseconds
    }).afterDismissed().subscribe(() => {
      console.log('The snack-bar was dismissed');
      this.router.navigate(['/products']); // Navigate to the products list
    });
  });
}

}
