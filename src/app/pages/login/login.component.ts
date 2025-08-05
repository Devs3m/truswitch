import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
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
      this.router.navigate(['/Listing']); 
    } else {
      alert('Invalid email or password!');
    }
  }
}
