import { Component, InjectionToken, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  standalone: true
})
export class BrowseComponent implements OnInit {
  auth = inject(AuthService);
  name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  profileImg = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  email = JSON.parse(sessionStorage.getItem("loggedInUser")!).email;

  ngOnInit() {
  }

  singOut(){
    sessionStorage.removeItem("loggedInUser");
    this.auth.signOut();
  }

}
