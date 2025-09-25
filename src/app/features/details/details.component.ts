import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './Services/product-details.service';
import { Product } from '../../Core/models/product.interface';
import { CartService } from '../cart/services/cart.service';
import { WishlistService } from '../wishlist/services/wishlist.service';
import { Wishlist } from '../wishlist/models/wishlist.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);

  private _id: string | null = null;
  public get id(): string | null {
    return this._id;
  }
  public set id(value: string | null) {
    this._id = value;
  }

  ProductDetails: Product = {} as Product;
  WishListProduct: Wishlist[] = [];
  checkId: string[] = [];
  isLoved: boolean = false;

  ngOnInit(): void {
    this.getProductId();
    this.checkLoveItem();
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.id = urlParams.get('id');
        this.getProductDetailsData();
      },
    });
  }

  getProductDetailsData(): void {
    this.productDetailsService.getproductDetails(this.id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.ProductDetails = res.data;
        this.checkIfProductIsLoved();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  checkLoveItem(): void {
    this.wishlistService.getLoggedUserWishList().subscribe({
      next: (res) => {
        this.WishListProduct = res.data;
        this.checkId = this.WishListProduct.map((item) => item.id);
        if (this.ProductDetails.id) {
          this.checkIfProductIsLoved();
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  checkIfProductIsLoved(): void {
    this.isLoved = this.checkId.includes(String(this.ProductDetails.id));
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

  addProductToWishList(id: string): void {
    this.wishlistService.addProductToWishList(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
          this.isLoved = true;
          this.checkId.push(id);
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
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
          this.isLoved = false;
          this.checkId = this.checkId.filter((itemId) => itemId !== id);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
