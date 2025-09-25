// import { Component, inject, Input, input, OnInit } from '@angular/core';
// import { Product } from '../../../Core/models/product.interface';
// import { RouterLink } from '@angular/router';
// import { CurrencyPipe, TitleCasePipe } from '@angular/common';
// import { TermPipe } from '../../pipes/Term/term-pipe';
// import { CartService } from '../../../features/cart/services/cart.service';
// import { ToastrService } from 'ngx-toastr';
// import { WishlistService } from '../../../features/wishlist/services/wishlist.service';
// import { ProductComponent } from '../../../features/product/product.component';

// @Component({
//   selector: 'app-card',
//   imports: [RouterLink, TitleCasePipe, CurrencyPipe, TermPipe],
//   templateUrl: './card.component.html',
//   styleUrl: './card.component.css',
// })
// export class CardComponent {
//   @Input({ required: true }) product: Product = {} as Product;
//   productitem: boolean = false;

//   private readonly cartService = inject(CartService);
//   private readonly toastrService = inject(ToastrService);
//   private readonly wishlistService = inject(WishlistService);
//   private readonly productComponent = inject(ProductComponent);

//   love: boolean = false;

//   addProductToCart(id: string): void {
//     this.cartService.addProductToCart(id).subscribe({
//       next: (res) => {
//         console.log(res);
//         if (res.status === 'success') {
//           this.toastrService.success(res.message, 'FreshCart');
//         }
//       },
//       error: (err) => {
//         console.log(err);
//       },
//     });
//   }

//   addProductToWishList(id: string): void {
//     this.wishlistService.addProductToWishList(id).subscribe({
//       next: (res) => {
//         console.log(res);

//         if (res.status === 'success') {
//           this.toastrService.success(res.message, 'FreshCart');
//         }
//         // this.love = true;
//         this.productComponent.checkLoveItem();
//       },
//     });
//   }

//   removeSpecificWishList(id: string): void {
//     this.wishlistService.removeSpecificWishList(id).subscribe({
//       next: (res) => {
//         console.log(res);

//         if (res.status === 'success') {
//           this.toastrService.success(res.message, 'FreshCart');
//         }
//         // this.love = false;
//         this.productComponent.checkLoveItem();
//       },
//     });
//   }
// }

import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../../Core/models/product.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { TermPipe } from '../../pipes/Term/term-pipe';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink, TitleCasePipe, CurrencyPipe, TermPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input({ required: true }) product: Product = {} as Product;
  productitem: boolean = false;

  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);

  love: boolean = false;

  ngOnInit(): void {
    this.saveit();
  }

  saveit(): void {
    this.productitem = this.product.isLoved ?? false;
    this.love = this.product.isLoved ?? false;
    console.log('love card:', this.productitem);
  }

  addProductToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);

        this.cartService.countNumber.next(res.numOfCartItems);

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
        }
        this.product.isLoved = true;
        this.saveit();
      },
    });
  }

  removeSpecificWishList(id: string): void {
    this.wishlistService.removeSpecificWishList(id).subscribe({
      next: (res) => {
        console.log(res);

        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
        }
        this.product.isLoved = false;
        this.saveit();
      },
    });
  }
}
