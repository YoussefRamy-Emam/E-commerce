import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../Core/services/products/products.service';
import { Product } from '../../../../Core/models/product.interface';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { Wishlist } from '../../../wishlist/models/wishlist.interface';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly wishlistService = inject(WishlistService);

  WishListProduct: Wishlist[] = [];
  checkId: string[] = [];
  productlist: Product[] = [];
  productsWithLove: any[] = [];

  ngOnInit(): void {
    this.getAllProductsData();
    this.checkLoveItem();
  }

  getAllProductsData(): void {
    this.productsService.getAllProduct().subscribe({
      next: (res) => {
        this.productlist = res.data;

        this.productsWithLove = this.productlist.map((product) => {
          return {
            ...product,
            isLoved: Array.isArray(this.checkId)
              ? this.checkId.includes(String(product.id))
              : false,
            // isLoved: this.checkId.includes(product.id),
          };
        });

        console.log('Products With Love:', this.productsWithLove);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  checkLoveItem(): void {
    this.wishlistService.getLoggedUserWishList().subscribe({
      next: (res) => {
        this.WishListProduct = res.data;

        // خزن بس الـ IDs في Array واحدة من غير تكرار
        this.checkId = this.WishListProduct.map((item) => item.id);

        console.log('Wishlist IDs:', this.checkId);

        this.getAllProductsData();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
