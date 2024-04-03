import { Router } from '@angular/router'; // Import the Router service
import { ProductService } from '../product.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  Subscription,
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  reduce,
  scan,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { FormControl } from '@angular/forms';
import { log } from 'console';
import { MatPaginator } from '@angular/material/paginator';
import { After } from 'v8';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Pipe({ name: 'safehtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  products: any[] = [];
  AllProducts: any[] = [];
  constructor(private productService: ProductService, private router: Router) {} // Inject the Router service here

  ngOnInit(): void {
    this.getProducts();
    this.getAllProducts();
  }

  onNavigate(event: Event, productId: string) {
    this.router.navigate(['product-details', productId]);
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.products = data.data;
      this.AllProducts = data.data;
    });
  }
  pageSize: number = 4;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentPage: number = 1;
  displayedData: any[] = [];

  original: any;
  loading = false;
  errorMessage = '';
  searchControl = new FormControl();
  subscriptions = new Subscription();

  // onPageChange(pageNumber: number) {
  //   this.currentPage = pageNumber;
  //   this.updateDisplayedData();
  // }

  updateDisplayedData() {}

  ngAfterViewInit(): void {
    // this.onPageChange(1);
    // this.getAllProducts();
  }

  sort(event: any) {
    // this.products = this.original
    switch (event.target.value) {
      case 'Low': {
        this.products = this.products.sort(
          (low, high) => low.price - high.price
        );
        this.displayedData = this.products;
        break;
      }

      case 'High': {
        this.products = this.products.sort(
          (low, high) => high.price - low.price
        );

        this.displayedData = this.products;
        break;
      }

      default: {
        this.displayedData = this.products;
        break;
      }
    }
    return this.products;
  }

  ///////////////////////////////////////////////////////////////////////

  getAllProducts(): void {
    this.products = this.AllProducts;
    if (this.searchControl.value === '') {
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    }
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((product) => {
          if (!product) {
            return this.productService.getAllProducts();
          } else {
            return this.filterProductsByTitle(product!);
            console.log(product);
          }
        }),
        catchError((error) => {
          console.error('Error during search:', error);
          return of([]); // Return an empty array in case of an error
        })
      )
      .subscribe((res) => {
        console.log(res);
        if (res.data) {
          this.products = res.data;
          this.displayedData = this.products;
          console.log(res);
        } else {
          this.products = res;
          this.displayedData = this.products;
          console.log(res);
        }
      });

    this.subscriptions.add(
      this.productService.getAllProducts().subscribe({
        next: (products) => {
          console.log(products);

          this.products = products.data;
          this.displayedData = this.products.slice(0, this.paginator?.pageSize);
          this.original = products;
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      })
    );
  }

  filterBy(event: any) {
    this.products = this.products.filter(
      (p) => p.category === event.target.value
    );
    this.displayedData = this.products.slice(0, this.paginator.pageSize);
    console.log(this.products);
  }
  filterProductsByTitle(searchProduct: string) {
    this.products = this.AllProducts;
    const filteredProducts = this.products?.filter((product) =>
      product.title.toLowerCase().includes(searchProduct.toLowerCase())
    );
    return of(filteredProducts);
  }
  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedData = this.products.slice(startIndex, endIndex);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
