import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UtilitiesService {
  entityRecords: { [key: number]: any[] } = {
  }
  lastViewedPage=1;
  totalEntityRecords = 0;
  entityRecordsPerPage = 0;
}
