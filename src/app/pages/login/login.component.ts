import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true
})
export class LoginComponent implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    this.loadGisLibrary();
  }


 loadGisLibrary() {
    // Create a new script element
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => {
      this.initializeGoogleSignIn();
    };
    document.head.appendChild(script);
  }

  initializeGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: '340013069433-cjlrjj77f7ban71285avl4egdhaclklo.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogIn(resp)
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 250
      });
  }

  private decodeToken(token: string){
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogIn(response: any){
    if(response){
      const payLoad = this.decodeToken(response.credential);
      sessionStorage.setItem("loggedInUser", JSON.stringify(payLoad));
      this.router.navigate(['browse'])
    }
  }
}
