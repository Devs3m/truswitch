import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  //  username: string = '';
  // password: string = '';

  // // Default login credentials
  // private defaultUsername = 'test@example.com';
  // private defaultPassword = '123456';

  // constructor(private router: Route) {}

  // onLogin() {
  //   const trimmedUsername = this.username.trim().toLowerCase();
  //   const trimmedPassword = this.password.trim();

  //   console.log('Entered:', trimmedUsername, trimmedPassword);

  //   if (
  //     trimmedUsername === this.defaultUsername.toLowerCase() &&
  //     trimmedPassword === this.defaultPassword
  //   ) {
  //     this.router.navigate(['/pages']); // ✅ route to listing page
  //   } else {
  //     alert('Invalid credentials. Try again.');
  //   }
  // }


    email: string = '';
  password: string = '';

  // Default credentials
  private defaultEmail = 'admin@truswitch.com';
  private defaultPassword = 'admin123';

  constructor(private router: Router) {}

  onLogin() {
    if (
      this.email.trim().toLowerCase() === this.defaultEmail &&
      this.password.trim() === this.defaultPassword
    ) {
      this.router.navigate(['/Listing']); // ✅ route to listing page
    } else {
      alert('Invalid email or password!');
    }
  }
}
