import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Core/services/authorization/auth.service';
import { CartService } from '../cart/services/cart.service';
import { Itemsorders } from './models/itemsorders.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  tokenId: string | undefined;
  cartItemData: Itemsorders[] = [];

  ngOnInit(): void {
    this.getIdToken();
    this.getUserOrderData();
  }

  getIdToken(): void {
    const decoded = this.authService.decodeToken();
    this.tokenId = decoded?.id;
  }

  getUserOrderData(): void {
    this.cartService.getUserOrder(this.tokenId).subscribe({
      next: (res) => {
        console.log(res);
        this.cartItemData = res;
      },
      error: (err) => {
        console.log(err);
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
}
