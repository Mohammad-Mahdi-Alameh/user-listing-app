import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserDetailsPageComponent } from './pages/user-details-page/user-details-page.component';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';
import { CustomListComponent } from '../../shared/custom-list/custom-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    UserListPageComponent, UserDetailsPageComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    CustomListComponent,
    InputTextModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    CardModule
  ]
})
export class UsersModule { }
