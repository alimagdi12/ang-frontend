import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  product: any;

  componentSubscriptions = new Subscription();
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
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
  }
  ///////////////////////////////////////////////////////////
}
