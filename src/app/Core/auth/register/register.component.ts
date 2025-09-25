import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/authorization/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);

  subscription: Subscription = new Subscription();
  flagPassword: boolean = true;
  flagrePassword: boolean = true;
  msgError: string = '';

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.fb.group(
      {
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
        rePassword: [
          null,
          [Validators.required, Validators.pattern(/^\w{6,}$/)],
        ],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
      },
      { validators: this.confirmPassword }
    );
  }

  confirmPassword(group: AbstractControl) {
    if (group.get('password')?.value === group.get('rePassword')?.value) {
      return null;
    } else {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.subscription = this.authService
        .registerForm(this.registerForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);

            if (res.message === 'success') {
              this.msgError = '';

              setTimeout(() => {
                this.cookieService.set('token', res.token);

                this.router.navigate(['/login']);
              }, 1000);
            }
          },
          error: (err) => {
            console.log(err);
            this.msgError = err.error.message;
          },
        });
    } else {
      this.registerForm.setErrors({ mismatch: true });
      this.registerForm.markAllAsTouched();
    }
  }
}

// <div
//         class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//         role="alert"
//       >
//         <ul class="mt-1.5 list-disc list-inside">
//           <li>Input is required.</li>
//           <li>Input should be more than or equal 2 chars</li>
//           <li>Input should be less than or equal 2 chars</li>
//           <li>Please enter a valid email address</li>
//           <li>Custom field should match the pattern</li>
//           <li>accept only egypt phone numbers</li>
//           <li>Password confirmtion is incorrect</li>
//         </ul>
//       </div>
