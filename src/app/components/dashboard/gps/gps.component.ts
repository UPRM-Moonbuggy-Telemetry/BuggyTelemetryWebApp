import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Map, getRndNumber } from '@jaortiz117/icon-map';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.css']
})
export class GpsComponent implements OnInit {

  @ViewChild('parent') parent: ElementRef;
  @ViewChild('element') element: ElementRef;
  @ViewChild('container') container: ElementRef;
  constructor() { }

  ngOnInit() {
    this.container.nativeElement.style.visibility = "visible";
    var map = new Map(this.parent.nativeElement, this.element.nativeElement, {
      top: -86.655645,
      bottom: -86.652185
    }, {
      top: 34.709558,
      bottom: 34.711180
    });
    map.refresh({
      y: getRndNumber(-86.655645, -86.652185),
      x: getRndNumber(34.709558,34.711180)
    });
  }

}
