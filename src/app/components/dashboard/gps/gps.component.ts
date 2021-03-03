/// <reference types="@types/google.maps" />

import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {DataService} from '../../../data.service';
import { Loader } from "@googlemaps/js-api-loader";

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.css']
})
export class GpsComponent implements OnInit {

  @ViewChild('map', { static: true }) mapElement: ElementRef;

  allData = [];
  errors = null;
  map: google.maps.Map;
  infoWindow: google.maps.InfoWindow;
  marker: google.maps.Marker;

  constructor(private _dataService: DataService) { }

  ngOnInit() {

    var pos = {
      lat: 18.2127354,
      lng: -67.1459692
    }

    const loader = new Loader({
      apiKey: "AIzaSyDk0ypYwZ2kZYe8wQjA2VsZT72Tg5A6FCU",
      version: "weekly",
    });
    
    loader.load().then(() => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: pos,
        zoom: 18,
        mapTypeId: 'satellite'
      });
      this.marker = new google.maps.Marker({
        position: pos,
        map: this.map,
      });
      this.infoWindow = new google.maps.InfoWindow({content: 'Location found.', position: pos});
    });

    setInterval(() => {
      this._dataService.getAllData().subscribe(
        data => {
          this.allData = data;
          this.errors = null;
        },
        error => {
          this.errors = error;
        }
      );
    }, 1000);

    setInterval(() => {
      if(this.errors==null) { // this is not refreshing; must check for errors (or try it without the 'if')
        this.refreshMap({lat: this.allData[0].latitude, lng: this.allData[0].longitude});
      }
      else {
        this.refreshMap({lat: 18.2127354, lng: -67.1459692});
      };
    }, 1000);

  }

  refreshMap(position) {
    this.map.setCenter(position);
    this.marker.setPosition(position);
    this.infoWindow.setPosition(position);
  }

}
