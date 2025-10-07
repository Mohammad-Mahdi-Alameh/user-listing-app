import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilitiesService } from '../../../../core/services/utilities.service';
import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrl: './user-details-page.component.scss'
})
export class UserDetailsPageComponent implements OnInit {
  user!: User;
  userId!: number;
  loading = true;

  constructor(
    private router: Router,
    private utlitiesService: UtilitiesService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    // this.loadingService.show();
    this.user = this.utlitiesService?.selectedEntity;
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.user || (this.user.id != this.userId)) {
      try {
        this.user = (await this.userService.getUserById(this.userId)).data;
      } catch {
        this.navigateToHomePage()
      }
    }
    this.loading = false;
    // this.loadingService.hide();
  }

  navigateToHomePage() {
    this.router.navigate([`/users`]);
  }

}
