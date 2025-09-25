import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  checkoutForm!: FormGroup;
  id: string | null = null;

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }

  initForm(): void {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
        city: [null, [Validators.required]],
      }),
    });
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlparams) => {
        this.id = urlparams.get('id');
      },
    });
  }

  getOrderVisaData(): void {
    if (this.checkoutForm.valid) {
      this.cartService
        .checkOutSession(this.id, this.checkoutForm.value)
        .subscribe({
          next: (res) => {
            if (res.status === 'success') {
              window.open(res.session.url, '_self');
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  /////////////////////////////////////////////////////
  getOrderCashData(): void {
    this.cartService.getOrderCash(this.id, this.checkoutForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.router.navigate(['/allorders']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
