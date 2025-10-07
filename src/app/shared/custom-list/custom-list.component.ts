import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, firstValueFrom } from 'rxjs';
import { AccordionModule } from 'primeng/accordion';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { UtilitiesService } from '../../core/services/utilities.service';
import { ApiService } from '../../core/services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
@Component({
  selector: 'app-custom-list',
  standalone: true,
  imports: [CommonModule, DataViewModule, FormsModule, AccordionModule, InputTextModule, PaginatorModule, ButtonModule, CardModule, SkeletonModule],
  templateUrl: './custom-list.component.html',
  styleUrl: './custom-list.component.scss'
})
export class CustomListComponent {
  @ViewChild('dv') dataView: any;
  @Input() entityApiUrl: string = '';
  @Input() entityApiHeader = new HttpHeaders();
  pagedEntityRecords: any[] = [];
  loading = true;
  filterMode = false;
  page = 1;
  fetchedPages = [1];
  filteredFetchedPages = [1];
  totalEntityRecords = 0;
  totalEntityRecordsBackup = 0;
  entityRecordsPerPage = 0;
  dataViewFirstIndex = 0;
  entityRecordsPerPageBackup = 0;
  entityApiUrlWithFilter: string = '';
  entityRecords: { [key: number]: any[] } = {
  }
  entityRecordsBackup: { [key: number]: any[] } = {
  }
  filteredEntityRecords: { [key: number]: any[] } = {
  }
  @Input() set searchTerm(value: any) {
    this._searchTerm = value;
    this.searchTermChanged.next(value);
  }
  private _searchTerm: any;
  get searchTerm(): any {
    return this._searchTerm;
  }

  private searchTermChanged = new Subject<string>();

  constructor(private router: Router,
    private apiService: ApiService,
    private utilitiesService: UtilitiesService) {
  }

  async handleSearchTermChange() {
    this.loading = true;
    if (!this.searchTerm || +this.searchTerm == 0) {
      if (this.dataView) {
        this.page = 1;
      } else {
        this.loading = false;
        return;
      }
      this.pagedEntityRecords = this.entityRecords[this.page];
      this.entityRecordsPerPage = this.entityRecordsPerPageBackup;
      this.totalEntityRecords = this.totalEntityRecordsBackup;
      this.filterMode = false;
      this.loading = false;
      return;
    }
    this.entityApiUrlWithFilter = `${this.entityApiUrl}/${this.searchTerm}`;
    this.pagedEntityRecords = [await this.initializeEntityRecords(this.entityApiUrlWithFilter, true)];
    this.loading = false;
  }

  async ngOnInit() {
    // debounce user input for 300ms to reduce API calls and improve UX
    this.searchTermChanged.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.handleSearchTermChange();
    });
    if (this.utilitiesService.entityRecords && Object.keys(this.utilitiesService.entityRecords).length > 0) {
      this.entityRecords = this.utilitiesService.entityRecords;
      this.page = this.utilitiesService.lastViewedPage;
      this.entityRecordsPerPage = this.utilitiesService.entityRecordsPerPage;
      this.totalEntityRecords = this.utilitiesService.totalEntityRecords;
      this.entityRecordsPerPageBackup = this.utilitiesService.entityRecordsPerPageBackup;
      this.dataViewFirstIndex = (this.entityRecordsPerPage * (this.page - 1));
      this.pagedEntityRecords = this.entityRecords[this.utilitiesService.lastViewedPage];
    } else {
      this.pagedEntityRecords = await this.initializeEntityRecords(this.entityApiUrl);
    }
    this.loading = false
  }

  navigateToUserDetailsPage(entity: any) {
    if (this.filterMode) {
      this.searchTerm = null;
      this.handleSearchTermChange();
    }
    this.utilitiesService.lastViewedPage = this.page;
    this.utilitiesService.entityRecords = this.entityRecords;
    this.utilitiesService.entityRecordsPerPage = this.entityRecordsPerPage;
    this.utilitiesService.totalEntityRecords = this.totalEntityRecords;
    this.utilitiesService.entityRecordsPerPageBackup = this.entityRecordsPerPageBackup;
    this.utilitiesService.selectedEntity = entity;
    this.router.navigate([`/users/${entity.id}`]);
  }

  async onPageChange(event: any) {
    this.loading = true
    this.page = (event.first / event.rows) + 1;
    if (this.filterMode) {
      //if page with filter already return it else fetch it
      if (!this.filteredFetchedPages.includes(this.page)) {
        let entityRecords = await this.initializeEntityRecords(this.entityApiUrlWithFilter, true);
        if (entityRecords?.length == 0) {
          this.loading = false
          return;
        }
        this.filteredFetchedPages.push(this.page);
      }
      this.pagedEntityRecords = this.filteredEntityRecords[this.page];
    } else {
      //if page already return it else fetch it
      if (!this.fetchedPages.includes(this.page)) {
        let entityRecords = await this.initializeEntityRecords(this.entityApiUrl);
        if (entityRecords?.length == 0) {
          this.loading = false
          return;
        }
        this.fetchedPages.push(this.page);
      }
      this.pagedEntityRecords = this.entityRecords[this.page];
    }
    this.loading = false
  }

  async initializeEntityRecords(url: string, filterMode: boolean = false) {
    try {
      let entityRecords = await firstValueFrom(this.apiService.get(`${url}?page=${this.page}`, this.entityApiHeader))
      if (filterMode) {
        this.filteredEntityRecords[this.page] = entityRecords.data;
        this.totalEntityRecords = 1;
        this.entityRecordsPerPage = 1;
        this.filterMode = true;
      } else {
        this.filterMode = false;
        this.totalEntityRecords = Number(entityRecords.total);
        this.totalEntityRecordsBackup = this.totalEntityRecords;
        this.entityRecordsPerPage = Number(entityRecords.per_page);
        this.entityRecordsPerPageBackup = this.entityRecordsPerPage;
        this.entityRecords[this.page] = entityRecords.data;
      }
      return entityRecords.data;
    } catch (err) {
      if (this.searchTerm) {
        console.error(`Error fetching user with id ${this.searchTerm}`, err);
        this.utilitiesService.notifyError(`Couldnt find user with id ${this.searchTerm}`);
      } else {
        console.error(`Error fetching users`, err);
        this.utilitiesService.notifyError(`Error fetching users`);
      }
      throw err;
    } finally {
      this.loading = false;
    }
  }

}
