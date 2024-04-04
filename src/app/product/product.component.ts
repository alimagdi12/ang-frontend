import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  Subscription,
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
} from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  products: any[] = [];
  AllProducts: any[] = [];
  pageSize: number = 4;
  currentPage: number = 1;
  displayedData: any[] = [];
  original: any;
  loading = false;
  errorMessage = '';
  searchControl = new FormControl();
  subscriptions = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getAllProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onNavigate(event: Event, productId: string) {
    this.router.navigate(['product-details', productId]);
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.products = data.data;
      this.AllProducts = data.data;
      this.displayedData = this.products.slice(
        0,
        this.paginator.pageSize
      );
    });
  }

  sort(event: any) {
    switch (event.target.value) {
      case 'Low': {
        this.products = this.products.sort(
          (low: any, high: any) => low.price - high.price
        );
        this.displayedData = this.products.slice(
          0,
          this.paginator.pageSize
        );;
        break;
      }
      case 'High': {
        this.products = this.products.sort(
          (low: any, high: any) => high.price - low.price
        );
        this.displayedData = this.products.slice(
          0,
          this.paginator.pageSize
        );;
        break;
      }
      default: {
        this.displayedData = this.products.slice(
          0,
          this.paginator.pageSize
        );
;
        break;
      }
    }
    return this.products;
  }

  getAllProducts(): void {
    this.products = this.AllProducts;
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((product) => {
          if (!product) {
            return this.productService.getAllProducts();
          } else {
            return this.filterProductsByTitle(product);
          }
        }),
        catchError((error) => {
          console.error('Error during search:', error);
          return of([]);
        })
      )
      .subscribe((res) => {
        if (res.data) {
          this.products = res.data;
          this.displayedData = this.products.slice(
            0,
            this.paginator.pageSize
          );
  ;
        } else {
          this.products = res;
          this.displayedData = this.products.slice(
            0,
            this.paginator.pageSize
          );
  ;
        }
      });

    this.subscriptions.add(
      this.productService.getAllProducts().subscribe({
        next: (products) => {
          this.products = products.data;
          this.displayedData = this.products.slice(
            0,
            this.paginator?.pageSize
          );
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
      (p: any) => p.category === event.target.value
    );
    this.displayedData = this.products.slice(0, this.paginator.pageSize);
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
}
