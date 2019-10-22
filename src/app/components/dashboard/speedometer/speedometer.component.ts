import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speedometer',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.css']
})
export class SpeedometerComponent implements OnInit {

  speed = 0.0;

  constructor() { }

  ngOnInit() {

    setInterval(() => {
      this.speed = getRandSpeed(0.0,100.0);
    }, 1000); 

    function getRandSpeed(min, max){
      return Math.round((Math.random() * (max - min)) + min);
    }

  }

}
