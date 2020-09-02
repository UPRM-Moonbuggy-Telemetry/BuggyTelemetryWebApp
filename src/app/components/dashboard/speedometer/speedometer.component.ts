import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {DataService} from '../../../data.service';

@Component({
  selector: 'app-speedometer',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.css']
})
export class SpeedometerComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

  speed = 0.0;

  constructor(private _dataService: DataService) { }

  ngOnInit() {

    setInterval(() => {
      this.speed = this._dataService.updateSpeedDataRand(0, 20);
      this.canvas.nativeElement.setAttribute('data-value', this.speed.toString());
    }, 1000); 

  }

}
