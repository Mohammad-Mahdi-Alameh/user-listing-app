import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ApiService {
  baseURL = environment.serverApiUrl;

  constructor(private http: HttpClient) { }

  get(url: string, headers?: HttpHeaders): Observable<any> {
    const options = headers ? { headers } : {};
    return this.http.get<any>(`${this.baseURL}${url}`, options);
  }

}


