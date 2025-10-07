import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { MessageService } from "primeng/api";

@Injectable({ providedIn: 'root' })
export class UtilitiesService {
  entityRecords: { [key: number]: any[] } = {
  }
  lastViewedPage = 1;
  totalEntityRecords = 0;
  entityRecordsPerPage = 0;
  selectedEntity: any;
  constructor(
    private messageService: MessageService) { }

  notifyError(message: string, life?: number): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: life || 5000,
    });
  }
}
