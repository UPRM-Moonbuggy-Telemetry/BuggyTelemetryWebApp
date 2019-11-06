import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-speedometer',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.css']
})
export class SpeedometerComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

  speed = 0.0;

  constructor() { }

  ngOnInit() {

    setInterval(() => {
      this.speed = getRandSpeed(0.0,20.0);
      this.canvas.nativeElement.setAttribute('data-value', this.speed.toString());
    }, 1000); 

    function getRandSpeed(min, max){
      return Math.round((Math.random() * (max - min)) + min);
    }

  }

}
