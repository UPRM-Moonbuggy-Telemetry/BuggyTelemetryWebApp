import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Map, getRndNumber } from '@jaortiz117/icon-map';
import {DataService} from '../../../data.service';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.css']
})
export class GpsComponent implements OnInit {

  @ViewChild('parent') parent: ElementRef;
  @ViewChild('element') element: ElementRef;
  @ViewChild('container') container: ElementRef;

  map: Map = [];
  allData = [];
  errors = null;

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
      if(this.errors==null) {
        this.map.refresh({x: this.allData[0].latitude, y: this.allData[0].longitude});
      }
      else {
        this.map.refresh({x: getRndNumber(34.709558, 34.711180), y: getRndNumber(-86.655645, -86.652185)});
      }
    }, 1000);

  }

}
