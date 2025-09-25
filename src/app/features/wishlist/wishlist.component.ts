import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from './services/wishlist.service';
import { Wishlist } from './models/wishlist.interface';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  WishListProduct: Wishlist[] = [];

  ngOnInit(): void {
    this.getLoggedUserWishList();
  }

  getLoggedUserWishList(): void {
    this.wishlistService.getLoggedUserWishList().subscribe({
      next: (res) => {
        console.log(res.data);
        this.WishListProduct = res.data;
      },
    });
  }

  addProductToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeSpecificWishList(id: string): void {
    this.wishlistService.removeSpecificWishList(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getLoggedUserWishList();
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
        }
      },
    });
  }
}
