import { Component, inject, Input, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../../Core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Core/services/authorization/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { platform } from 'os';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private flowbiteService: FlowbiteService) {}
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly id = inject(PLATFORM_ID);

  @Input({ required: true }) islogin!: boolean;
  count!: number;

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.getCartNumber();
    if (isPlatformBrowser(this.id)) {
      this.getAllDataCart();
    }
  }

  signOut(): void {
    this.authService.logout();
  }

  getAllDataCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.countNumber.next(res.numOfCartItems);
      },
    });
  }

  getCartNumber(): void {
    this.cartService.countNumber.subscribe({
      next: (value) => {
        this.count = value;
      },
    });
  }
}
