import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TrackFeatures } from '../../models/trackFeatures.model';
import { Track } from '../../models/track.model';
import { Artist } from '../../models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class GraphicService {

  private url = environment.api;

  constructor(private httpClient: HttpClient) {
  }

  getTopTracksByFeatures() {
    return this.httpClient.get<TrackFeatures[]>(this.url + '/graphic/track/features/top');
  }

  getTopTracksByPopularity() {
    return this.httpClient.get<Track[]>(this.url + '/graphic/track/popularity/top');
  }

  getTopArtistsByPopularity() {
    return this.httpClient.get<Artist[]>(this.url + '/graphic/artist/popularity/top');
  }

}
