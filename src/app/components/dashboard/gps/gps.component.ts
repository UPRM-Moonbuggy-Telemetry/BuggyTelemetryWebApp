import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Map, getRndNumber } from '@jaortiz117/icon-map';
import {DataService} from '../../../data.service';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.css']
})
export class GpsComponent implements OnInit {

  @ViewChild('parent', { static: true }) parent: ElementRef;
  @ViewChild('element', { static: true }) element: ElementRef;
  @ViewChild('container', { static: true }) container: ElementRef;

  map: Map = [];
  allData = [];

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.map = new Map(this.parent.nativeElement, this.element.nativeElement, {
      top: -86.652185,
      bottom: -86.655645
    }, {
      top: 34.711180,
      bottom: 34.709558
    });

    setInterval(() => {
      this._dataService.getAllData().subscribe(data => {
        this.allData = data;
      });
    }, 1000);

    // setInterval(() => {
    //   this.map.refresh({x: this.allData[0].latitude, y: this.allData[0].longitude}) ;
    //   }, 1000);

    setInterval(() => {
      this.map.refresh({x: getRndNumber(34.709558, 34.711180), y: getRndNumber(-86.655645, -86.652185)});
    }, 1000);
  }

}
