import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  chart = []; // This will hold our chart info

    constructor(private _weather: WeatherService) {}

    ngOnInit() {
      this._weather.dailyForecast()
        .subscribe(res => {
          console.log(res)
        })
    }
}
