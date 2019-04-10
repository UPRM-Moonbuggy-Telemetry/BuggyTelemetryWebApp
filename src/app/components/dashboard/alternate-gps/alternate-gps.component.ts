import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../data.service';

@Component({
  selector: 'app-alternate-gps',
  templateUrl: './alternate-gps.component.html',
  styleUrls: ['./alternate-gps.component.css']
})
export class AlternateGpsComponent implements OnInit {

  allData = [];
  lat = 0;
  lon = 0;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    setInterval(() => {
      this._dataService.getAllData().subscribe(data => {
        this.allData = data;
      });
    }, 1000);

    setInterval(() => {
      this.lat = this.allData[0].latitude;
      this.lon = this.allData[0].longitude;
      }, 1000);
  }

}
