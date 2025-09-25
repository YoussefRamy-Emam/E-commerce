import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { AuthService } from '../../services/authorization/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css',
})
export class ForgetpasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);

  verifyEmail!: FormGroup;
  verifyCode!: FormGroup;
  resetPassword!: FormGroup;
  step: number = 1;

  ngOnInit(): void {
    this.initFirm();
  }

  initFirm(): void {
    this.verifyEmail = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
    this.verifyCode = this.fb.group({
      resetCode: [null, [Validators.required]],
    });
    this.resetPassword = this.fb.group(
      {
        newPassword: [
          null,
          [Validators.required, Validators.pattern(/^\w{6,}$/)],
        ],
        reNewPassword: [
          null,
          [Validators.required, Validators.pattern(/^\w{6,}$/)],
        ],
      },
      { validators: this.confirmPassword }
    );
  }

  confirmPassword(group: AbstractControl) {
    if (group.get('newPassword')?.value === group.get('reNewPassword')?.value) {
      return null;
    } else {
      group.get('reNewPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }

  formStep1(): void {
    if (this.verifyEmail.valid) {
      this.authService.submitVerifyEmail(this.verifyEmail.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.statusMsg === 'success') {
            this.toastrService.success(res.message, 'FreshCart');
          }
          this.step = 2;
        },
      });
    }
  }

  formStep2(): void {
    if (this.verifyCode.valid) {
      this.authService.submitVerifyCode(this.verifyCode.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'Success') {
            this.toastrService.success('Create new password', 'FreshCart');
          }
          this.step = 3;
        },
      });
    }
  }

  sendData() {
    const EmailReset = this.verifyEmail.get('email')?.value;
    const passwordReset = this.resetPassword.get('newPassword')?.value;

    console.log(EmailReset);
    console.log(passwordReset);

    return {
      email: EmailReset,
      newPassword: passwordReset,
    };
  }

  formStep3(): void {
    if (this.resetPassword.valid) {
      this.authService.submitResetPassword(this.sendData()).subscribe({
        next: (res) => {
          console.log(res);
          this.toastrService.success('success, now goto login', 'FreshCart');
          this.router.navigate(['/login']);
        },
      });
    }
  }
}
