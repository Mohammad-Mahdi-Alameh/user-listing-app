import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserDetailsPageComponent } from './pages/user-details-page/user-details-page.component';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';



@NgModule({
  declarations: [UserListPageComponent,UserDetailsPageComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
