import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TrackFeatures } from '../../models/trackFeatures.model';

@Injectable({
  providedIn: 'root'
})
export class GraphicService {

  private url = environment.api;

  constructor(private httpClient: HttpClient) {
  }

  getTopTracksWithFeatures() {
    return this.httpClient.get<TrackFeatures[]>(this.url + '/graphic/track/features/top');
  }

}
