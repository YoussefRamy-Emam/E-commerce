import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Cart } from '../../Core/models/cart.interface';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartservice = inject(CartService);

  cartDetails: Cart = {} as Cart;
  ngOnInit(): void {
    this.getLoggedUserCart();
  }

  getLoggedUserCart(): void {
    this.cartservice.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeSpecificCartItem(id: string): void {
    this.cartservice.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
        this.cartservice.countNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateCartCount(id: string, count: number) {
    this.cartservice.updateCartCount(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
