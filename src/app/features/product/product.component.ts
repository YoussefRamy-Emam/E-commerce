// import { Component, inject, OnInit } from '@angular/core';
// import { CardComponent } from '../../shared/components/card/card.component';
// import { Product } from '../../Core/models/product.interface';
// import { ProductsService } from '../../Core/services/products/products.service';
// import { NgxPaginationModule } from 'ngx-pagination';
// import { SearchPipe } from '../../shared/pipes/Search/search-pipe';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-product',
//   imports: [CardComponent, NgxPaginationModule, SearchPipe, FormsModule],
//   templateUrl: './product.component.html',
//   styleUrl: './product.component.css',
// })
// export class ProductComponent implements OnInit {
//   private readonly productsService = inject(ProductsService);

//   text: string = ' ';
//   limit!: number;
//   currentPage!: number;
//   results!: number;

//   productlist: Product[] = [];

//   ngOnInit(): void {
//     this.getAllProductsData();
//   }

//   getAllProductsData(pageNmber: number = 1): void {
//     this.productsService.getAllProduct(pageNmber).subscribe({
//       next: (res) => {
//         console.log(res.data);
//         this.productlist = res.data;
//         this.limit = res.metadata.limit;
//         this.currentPage = res.metadata.currentPage;
//         this.results = res.results;
//       },
//       error: (err) => {},
//     });
//   }
// }

// import { Component, inject, OnInit } from '@angular/core';
// import { CardComponent } from '../../shared/components/card/card.component';
// import { Product } from '../../Core/models/product.interface';
// import { ProductsService } from '../../Core/services/products/products.service';
// import { NgxPaginationModule } from 'ngx-pagination';
// import { SearchPipe } from '../../shared/pipes/Search/search-pipe';
// import { FormsModule } from '@angular/forms';
// import { WishlistService } from '../wishlist/services/wishlist.service';
// import { Wishlist } from '../wishlist/models/wishlist.interface';

// @Component({
//   selector: 'app-product',
//   imports: [CardComponent, NgxPaginationModule, SearchPipe, FormsModule],
//   templateUrl: './product.component.html',
//   styleUrl: './product.component.css',
// })
// export class ProductComponent implements OnInit {
//   private readonly productsService = inject(ProductsService);
//   private readonly wishlistService = inject(WishlistService);

//   text: string = ' ';
//   limit!: number;
//   currentPage!: number;
//   results!: number;

//   WishListProduct: Wishlist[] = [];
//   checkId: string[] = [];
//   productlist: Product[] = [];
//   productsWithLove: any[] = [];

//   ngOnInit(): void {
//     this.checkLoveItem();
//   }

//   getAllProductsData(pageNmber: number = 1): void {
//     this.productsService.getAllProduct(pageNmber).subscribe({
//       next: (res) => {
//         console.log(res.data);
//         this.productlist = res.data;
//         this.limit = res.metadata.limit;
//         this.currentPage = res.metadata.currentPage;
//         this.results = res.results;

//         this.productsWithLove = this.productlist.map((product) => {
//           return {
//             ...product,
//             isLoved: Array.isArray(this.checkId)
//               ? this.checkId.includes(String(product.id))
//               : false,
//           };
//         });
//         console.log('productWithLove', this.productsWithLove);
//       },
//       error: (err) => {},
//     });
//   }

//   checkLoveItem(): void {
//     this.wishlistService.getLoggedUserWishList().subscribe({
//       next: (res) => {
//         this.WishListProduct = res.data;
//         this.checkId = this.WishListProduct.map((item) => item.id);
//         this.getAllProductsData();
//       },
//       error: (err) => {
//         console.error(err);
//       },
//     });
//   }
// }

import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { Product } from '../../Core/models/product.interface';
import { ProductsService } from '../../Core/services/products/products.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/Search/search-pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../wishlist/services/wishlist.service';
import { Wishlist } from '../wishlist/models/wishlist.interface';

@Component({
  selector: 'app-product',
  imports: [CardComponent, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly wishlistService = inject(WishlistService);

  text: string = ' ';
  limit!: number;
  currentPage!: number;
  results!: number;

  WishListProduct: Wishlist[] = [];
  checkId: string[] = [];
  productlist: Product[] = [];
  productsWithLove: any[] = [];

  ngOnInit(): void {
    this.checkLoveItem();
  }

  getAllProductsData(pageNmber: number = 1): void {
    this.productsService.getAllProduct(pageNmber).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productlist = res.data;
        this.limit = res.metadata.limit;
        this.currentPage = res.metadata.currentPage;
        this.results = res.results;

        this.productsWithLove = this.productlist.map((product) => {
          return {
            ...product,
            isLoved: Array.isArray(this.checkId)
              ? this.checkId.includes(String(product.id))
              : false,
          };
        });
      },
      error: (err) => {},
    });
  }

  checkLoveItem(): void {
    this.wishlistService.getLoggedUserWishList().subscribe({
      next: (res) => {
        this.WishListProduct = res.data;
        this.checkId = this.WishListProduct.map((item) => item.id);
        this.getAllProductsData();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
