import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { firstValueFrom } from "rxjs";
import { ApiURL } from "../miscellaneous/api.template";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { UtilitiesService } from "./utilities.service";

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private apiService: ApiService,
    private utilitiesService: UtilitiesService) { }

  getHeaders() {
    return new HttpHeaders({ 'x-api-key': environment.usersApiKey });
  }
  async getUsers() {
    try {
      return await firstValueFrom(this.apiService.get(ApiURL.users, this.getHeaders()));
    }
    catch (err) {
      console.error('Error fetching users', err);
      this.utilitiesService.notifyError("Error fetching users");
      throw err;
    }
  }

  async getUserById(id: number) {
    try {
      return await firstValueFrom(this.apiService.get(`${ApiURL.users}/${id}`, this.getHeaders()));
    } catch (err) {
      this.utilitiesService.notifyError(`Error fetching user ${id}`);
      console.error(`Error fetching user ${id}`, err);
      throw err;
    }
  }

}
