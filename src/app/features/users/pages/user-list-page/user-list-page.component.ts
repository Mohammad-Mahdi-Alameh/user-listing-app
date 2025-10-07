import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { ApiURL } from '../../../../core/miscellaneous/api.template';
import { UserService } from '../../../../core/services/user.service';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrl: './user-list-page.component.scss'
})
export class UserListPageComponent implements OnInit {
  users: User[] = [];
  usersEntityApiUrl = ApiURL.users;
  usersEntityApiHeader = new HttpHeaders();
  searchTerm!: any;

  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.usersEntityApiHeader = this.userService.getHeaders();
  }
  resetSearch() {
    this.searchTerm = null
  }

}
