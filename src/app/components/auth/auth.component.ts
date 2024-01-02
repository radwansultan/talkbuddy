import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  @ViewChild('authForm', { static: true }) authForm!: NgForm;
  isLoggedInMode: boolean = true;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoggedInMode = !this.isLoggedInMode;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.errorMessage = '';
    if (!form.valid) {
      this.isLoading = false;
      return;
    } else {
      const email = form.value.email;
      const password = form.value.password;
      if (this.isLoggedInMode) {
        this.authService.login(email, password).subscribe({
          next: (resData: any) => {
            console.log(resData);
          },
          error: (error) => {
            console.log(error.error.error.message);
            this.errorMessage = error.error.error.message;
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          },
        });
        this.authForm.reset();
      } else {
        this.authService.signup(email, password).subscribe({
          next: (resData: any) => {
            console.log(resData);
          },
          error: (error) => {
            console.log(error.error.error.message);
            this.errorMessage = error.error.error.message;
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          },
        });
        this.authForm.reset();
      }
    }
  }
}
