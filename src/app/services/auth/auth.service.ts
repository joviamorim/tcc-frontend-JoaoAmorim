import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.api;

  constructor(private httpClient: HttpClient) { }


  // auth() {
  //   this.httpClient.post(this.url + '/auth/spotify/login', {});
  // }

  loginWithSpotify(): void {
    if (typeof window !== 'undefined') {
      window.location.href = `${this.url}/auth/spotify/login`;
    }
    //window.location.href = this.url + '/auth/spotify/login';
  }
}
