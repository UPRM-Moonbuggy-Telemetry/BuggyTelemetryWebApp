import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import * as h337 from 'heatmap.js';

@Component({
  selector: 'app-buggys',
  templateUrl: './buggys.component.html',
  styleUrls: ['./buggys.component.css']
})
export class BuggysComponent {

  constructor() { }
  @ViewChild('map') map: ElementRef;

  ngOnInit() {
    var heatmapInstance = h337.create({
      // This is where the info is stored!
      container: this.map.nativeElement
    });

    // Random data generators and limits.
    var height = 360;
    var width = 370; // Actual space width is 400, yet the heatmap exceeds boundaries when it's 400.
    var max = 150; // Higher the number, less saturated and extreme red splotches.
    var len = 400; // Smaller the number, more precise red area marking of the points.
    var points = [];

    while (len--) {
      var randval = Math.floor(Math.random()*100);
      max = Math.max(max, randval);

      var point = {
        x: Math.floor(Math.random()*width),
        y: Math.floor(Math.random()*height),
        value: randval
      };
      points.push(point);
    }

    // Follow heatmap data format.
    var data = {
      max: max,
      min: 10,
      data: points
     };

    // Installs data which has been given by the variable above.
    heatmapInstance.setData(data);
  }

}
