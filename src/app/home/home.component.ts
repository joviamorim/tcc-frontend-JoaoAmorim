import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { GraphicService } from '../services/graphic/graphic.service';
import { TrackFeatures } from '../models/trackFeatures.model';
import { Track } from '../models/track.model';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Artist } from '../models/artist.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  private trackFeatures$ = new Observable<TrackFeatures[]>;
  private track$ = new Observable<Track[]>;
  private artist$ = new Observable<Artist[]>;

  private allTrackFeatures: TrackFeatures[] = [];
  private allTracks: Track[] = [];
  private allArtists: Artist[] = [];

  protected chartList: string[] = [];
  protected mainChart: string = "";
  
  protected charts: {name:string, data:any}[] = [];

  constructor(private graphicService: GraphicService, private authService: AuthService) {
    this.trackFeatures$ = this.graphicService.getTopTracksByFeatures();
    this.trackFeatures$.subscribe(all => this.allTrackFeatures = all);

    this.track$ = this.graphicService.getTopTracksByPopularity();
    this.track$.subscribe(all => this.allTracks = all);

    this.artist$ = this.graphicService.getTopArtistsByPopularity();
    this.artist$.subscribe(all => this.allArtists = all);
  }

  private data: any = {n1: 3, n2: 20};

  // iniciando os gráficos
  ngOnInit(){
    const trackFeaturesAvg: Partial<TrackFeatures> = {};

    this.allTrackFeatures.forEach(track => {
      trackFeaturesAvg.energy? trackFeaturesAvg.energy = (trackFeaturesAvg.energy + track.energy) / 2 : trackFeaturesAvg.energy = track.energy;
      trackFeaturesAvg.valence? trackFeaturesAvg.valence = (trackFeaturesAvg.valence + track.valence) / 2 : trackFeaturesAvg.valence = track.valence;
      trackFeaturesAvg.danceability? trackFeaturesAvg.danceability = (trackFeaturesAvg.danceability + track.danceability) / 2 : trackFeaturesAvg.danceability = track.danceability;
      trackFeaturesAvg.instrumentalness? trackFeaturesAvg.instrumentalness = (trackFeaturesAvg.instrumentalness + track.instrumentalness) / 2 : trackFeaturesAvg.instrumentalness = track.instrumentalness;
      trackFeaturesAvg.acousticness? trackFeaturesAvg.acousticness = (trackFeaturesAvg.acousticness + track.acousticness) / 2 : trackFeaturesAvg.acousticness = track.acousticness;
      trackFeaturesAvg.speechiness? trackFeaturesAvg.speechiness = (trackFeaturesAvg.speechiness + track.speechiness) / 2 : trackFeaturesAvg.speechiness = track.speechiness;
    });

    this.createChart("trackFeaturesAvg", trackFeaturesAvg);
    this.chartList.push("trackFeaturesAvg");

    const trackMap = this.allTracks.reduce((acc, track) => {
      acc[track.name] = track.popularity; //define name como chave e popularity como valor
      return acc;
    }, {} as { [key: string]: number});

    this.createChart("trackPopularity", trackMap);
    this.chartList.push("trackPopularity");

    const artistMap = this.allArtists.reduce((acc, artist) => {
      acc[artist.name] = artist.popularity; //define name como chave e popularity como valor
      return acc;
    }, {} as { [key: string]: number});

    this.createChart("artistPopularity", artistMap);
    this.chartList.push("artistPopularity");

    // gráfico reserva
    this.createChart("chartReserva", this.data);
    this.chartList.push("chartReserva");
  }

  // inicializando os gráficos
  createChart(chartName:string, chartData:any) {

    this.charts.push({name:chartName, data:chartData});

    const chart = new Chart(chartName, {
      type: 'bar',
      data: {
        datasets: [{
          label: '# Media',
          data: chartData,
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
    return chart;
  }

  // atualizar os gráficos de acordo com a opção que o usuário escolher
  // deve ser trocado o gráfico principal com o gráfico escolhido da lista
  updateChart(chart:string){
    const currentIndex = this.chartList.findIndex(currentChart => chart === currentChart);
    const currentChart = this.chartList[currentIndex];

    this.chartList[currentIndex] = this.chartList[0];
    this.chartList[0] = currentChart;
  }
}
