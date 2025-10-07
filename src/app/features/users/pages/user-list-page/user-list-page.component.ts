import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { ApiURL } from '../../../../core/miscellaneous/api.template';
import { UserService } from '../../../../core/services/user.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrl: './user-list-page.component.scss'
})
export class UserListPageComponent implements OnInit {
  users = [];
  usersEntityApiUrl = ApiURL.users;
  usersEntityApiHeader = new HttpHeaders();
  searchTerm!: any;

  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.usersEntityApiHeader = this.userService.getHeaders();
  }
  resetSearch() {
    // this.searchTerm = '';
    this.searchTerm = null
  }

  // sanitizeSearchTerm() {
  //   // Remove any non-numeric characters
  //   this.searchTerm = this.searchTerm?.toString().replace(/[^0-9]/g, '');

  //   // Convert to number and ensure it's at least 1
  //   const numValue = parseInt(this.searchTerm || '0', 10);

  //   // If less than 1, clear it
  //   if (numValue < 1) {
  //     this.searchTerm = '';
  //   } else {
  //     this.searchTerm = numValue.toString();
  //   }
  // }



}
