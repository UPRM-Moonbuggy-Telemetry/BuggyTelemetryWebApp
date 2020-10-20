import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {DataService} from '../../../data.service';

@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.css']
})

export class SignalComponent implements OnInit {

  @ViewChild('red') red: ElementRef;
  @ViewChild('green') green: ElementRef;

  errors = null;

  constructor(private _dataService: DataService) { }

  ngOnInit() {

    setInterval(() => {
      this._dataService.getAllData().subscribe(
        data => {
          this.errors = null;
        },
        error => {
          this.errors = error;
        }
      );
    }, 1000);

    setInterval(() => {
      if(this.errors == null) {
        this.red.nativeElement.setAttribute("src", ".\\assets\\btnRed_2.png");
        this.green.nativeElement.setAttribute("src", ".\\assets\\btnGreen.png");
      }
      else {
        this.red.nativeElement.setAttribute("src", ".\\assets\\btnRed_on.png");
        this.green.nativeElement.setAttribute("src", ".\\assets\\btnGreen_2.png");
      }
    }, 1000);

  }

}
