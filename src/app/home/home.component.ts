import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { GraphicService } from '../services/graphic/graphic.service';
import { TrackFeatures } from '../models/trackFeatures.model';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  private trackFeatures$ = new Observable<TrackFeatures[]>;
  private allTrackFeatures: TrackFeatures[] = [];
  public chartList: Chart<"bar", { teste: string;numero: number; }[], unknown>[] = [];

  constructor(private graphicService: GraphicService, private authService: AuthService) {
    this.trackFeatures$ = this.graphicService.getTopTracksWithFeatures();
    this.trackFeatures$.subscribe(all => this.allTrackFeatures = all);
  }

  ngOnInit(){
    // var trackFeaturesNames = [
    //   "Energia", "Valência", "Intensidade", "Dançabilidade",
    //   "Instrumentalidade", "Acusticidade", "Fala"
    // ];

    var trackFeaturesAvg: Partial<TrackFeatures> = {};

    this.allTrackFeatures.forEach(track => {
      trackFeaturesAvg.energy? trackFeaturesAvg.energy = (trackFeaturesAvg.energy + track.energy) / 2 : trackFeaturesAvg.energy = track.energy;
      trackFeaturesAvg.valence? trackFeaturesAvg.valence = (trackFeaturesAvg.valence + track.valence) / 2 : trackFeaturesAvg.valence = track.valence;
      //trackFeaturesAvg.loudness? trackFeaturesAvg.loudness = (trackFeaturesAvg.loudness + track.loudness) / 2 : trackFeaturesAvg.loudness = track.loudness;
      trackFeaturesAvg.danceability? trackFeaturesAvg.danceability = (trackFeaturesAvg.danceability + track.danceability) / 2 : trackFeaturesAvg.danceability = track.danceability;
      trackFeaturesAvg.instrumentalness? trackFeaturesAvg.instrumentalness = (trackFeaturesAvg.instrumentalness + track.instrumentalness) / 2 : trackFeaturesAvg.instrumentalness = track.instrumentalness;
      trackFeaturesAvg.acousticness? trackFeaturesAvg.acousticness = (trackFeaturesAvg.acousticness + track.acousticness) / 2 : trackFeaturesAvg.acousticness = track.acousticness;
      trackFeaturesAvg.speechiness? trackFeaturesAvg.speechiness = (trackFeaturesAvg.speechiness + track.speechiness) / 2 : trackFeaturesAvg.speechiness = track.speechiness;
    });

    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        //labels: trackFeaturesNames,
        datasets: [{
          label: '# Media',
          data: trackFeaturesAvg,
          borderWidth: 1
        },
        {
          label: '# teste',
          data: trackFeaturesAvg,
          borderWidth: 1
        },
      ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    var chart3 = new Chart("myChart3", {
      type: 'bar',
      data: {
        //labels: trackFeaturesNames,
        datasets: [{
          label: '# Media',
          data: 
            {n1: 2, n2:1},
          borderWidth: 1
        },
      ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    var chart2 = new Chart("myChart2", {
      type: 'bar',
      data: {
        //labels: trackFeaturesNames,
        datasets: [{
          label: '# Media',
          data: {n1: 21, n2:13},
          borderWidth: 1
        },
      ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    var chart1 = new Chart("myChart1", {
      type: 'bar',
      data: {
        //labels: trackFeaturesNames,
        datasets: [{
          label: '# Media',
          data: {n1: 3, n2:20},
          borderWidth: 1
        },
      ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  getTopMusics() {

  }

}
