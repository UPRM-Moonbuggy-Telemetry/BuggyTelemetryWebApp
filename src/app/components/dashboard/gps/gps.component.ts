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
    var map = new Map(this.parent.nativeElement, this.element.nativeElement, {
      top: 100,
      bottom: 0
    }, {
      top: 100,
      bottom: 0
    });
    map.refresh({
      y: getRndNumber(0, 100),
      x: getRndNumber(0, 100)
    });
  }

}
