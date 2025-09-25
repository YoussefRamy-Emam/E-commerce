import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/authorization/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { log } from 'console';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);

  msgError: string = '';
  subscribtion: Subscription = new Subscription();
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.subscribtion.unsubscribe();

      this.subscribtion = this.authService
        .loginForm(this.loginForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);

            if (res.message === 'success') {
              this.msgError = '';

              setTimeout(() => {
                this.cookieService.set('token', res.token);
                console.log(this.authService.decodeToken());

                this.router.navigate(['/home']);
              }, 1000);
            }
          },
          error: (err) => {
            console.log(err);
            this.msgError = err.error.message;
          },
        });
    }
  }
}
