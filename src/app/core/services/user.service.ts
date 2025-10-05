import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { firstValueFrom } from "rxjs";
import { ApiURL } from "../miscellaneous/api.template";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private apiService: ApiService) { }

  headers = new HttpHeaders({ 'x-api-key': environment.usersApiKey });

  getUsers() {
    return firstValueFrom(this.apiService.get(ApiURL.users, this.headers));
  }
}
