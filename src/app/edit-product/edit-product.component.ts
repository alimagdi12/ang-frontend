import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from './product.interface';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const productId = params.get('productId') ?? '';
    this.productService.getProductById(productId).subscribe((data: any) => {
      this.product = data;
    });
  });
}


  onSubmit(): void {
    const productId = this.route.snapshot.paramMap.get('productId') ?? '';
    this.productService.putEditProduct(productId, this.product).subscribe(() => {
      console.log('Product updated successfully');
      this.router.navigate(['/products']);
    });
  }
}
