import { Component, inject, Input } from '@angular/core';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../Core/models/product.interface';

@Component({
  selector: 'app-loved',
  imports: [],
  templateUrl: './loved.component.html',
  styleUrl: './loved.component.css',
})
export class LovedComponent {
  // private readonly wishlistService = inject(WishlistService);
  // private readonly toastrService = inject(ToastrService);
  // @Input() loved: boolean | undefined = false;
  // addProductToWishList(id: string): void {
  //   this.wishlistService.addProductToWishList(id).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       if (res.status === 'success') {
  //         this.toastrService.success(res.message, 'FreshCart');
  //       }
  //     },
  //   });
  // }
  // removeSpecificWishList(id: string): void {
  //   this.wishlistService.removeSpecificWishList(id).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       if (res.status === 'success') {
  //         this.toastrService.success(res.message, 'FreshCart');
  //       }
  //     },
  //   });
  // }
}
