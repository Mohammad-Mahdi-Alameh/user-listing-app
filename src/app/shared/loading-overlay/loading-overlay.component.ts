import { Component, OnInit, Input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable } from 'rxjs';
import { LoadingService } from '../../core/services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
  standalone: true,
  imports: [
    ProgressSpinnerModule,CommonModule
  ]
})
export class LoadingOverlayComponent  {

  // isLoading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    // this.isLoading$ = this.loadingService.loading$;
  }

}
