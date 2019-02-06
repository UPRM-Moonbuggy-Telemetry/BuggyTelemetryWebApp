import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
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

  map: Map = [];
  constructor() {
  }

  ngOnInit() {
    this.map = new Map(this.parent.nativeElement, this.element.nativeElement, {
      top: -86.652185,
      bottom: -86.655645
    }, {
      top: 34.711180,
      bottom: 34.709558
    });
    // map.refresh({
    //   y: getRndNumber(-86.655645, -86.652185),
    //   x: getRndNumber(34.709558,34.711180)
    // });
  }

  ngAfterViewInit(){
    this.map.refresh({
      y: -86.652185,
      x: 34.711180
    });

    console.log("y: " + this.element.nativeElement.style.top, ", x: " + this.element.nativeElement.style.left);
    console.log("Paren top: " + this.parent.nativeElement.style.top + ", Paren height: " + (this.parent.nativeElement.style.top + this.parent.nativeElement.style.height));
  }

}
