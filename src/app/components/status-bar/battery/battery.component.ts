import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-battery',
  templateUrl: './battery.component.html',
  styleUrls: ['./battery.component.css']
})
export class BatteryComponent implements OnInit {

  status;
  allData = [];

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    setInterval(() => {
      this._dataService.getAllData().subscribe(data => {
        this.allData = data;
      })
    }, 1000);
    setInterval(() => {this.updateStatus()}, 1000);
  }

  updateStatus(){
    this.status = this.allData[0].battery_status;
  }

}
