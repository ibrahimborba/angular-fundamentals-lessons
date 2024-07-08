import { Component, inject, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './data';
import { UserInfoComponent } from './user-info/user-info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserInfoComponent],
  template: `
    <h1>User Listing</h1>
    @for (userEntry of userData; track userEntry) {
      <app-user-info [user]="userEntry"/>
    }
  `,
})
export class AppComponent implements OnInit {
  userService = inject(UserService);
  userData: User[] = [];

  async ngOnInit(): Promise<void> {
    const data = await this.userService.getUserData();
    this.userData = data
  }
  constructor() {
    this.userService.getUserData().then((data) => { this.userData = data});
  }
}
