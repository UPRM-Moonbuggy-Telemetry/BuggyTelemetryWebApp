import {Component, ElementRef, ViewChild} from '@angular/core';
import {DataService} from '../../../data.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-buggys',
  templateUrl: './buggys.component.html',
  styleUrls: ['./buggys.component.css']
})
export class BuggysComponent {
  allData = [];
  errors = null;

  constructor(private _dataService: DataService) {}

  @ViewChild('canvas') canvas: ElementRef;

  ngOnInit() {

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
      this.updateHeatmap();
    }, 1000);

  }

  getStrainLeftData() {
    if(this.errors == null) { // if connected, call DB data
      var strain_1L = this.allData[0].strain_front_lft_1;
      var strain_2L = this.allData[0].strain_front_lft_2;
      var strain_3L = this.allData[0].strain_front_lft_3;
  
      // Strain calculation placeholder (MUST CHANGE)
      return (strain_1L + strain_2L + strain_3L) / 3;
    }
    else { // if disconnected, return a randomized value
      return Math.floor(Math.random()*100);
    }
  }

  getStrainRightData() { // if connected, call DB data
    if(this.errors == null) {
      var strain_1R = this.allData[0].strain_front_rt_1;
      var strain_2R = this.allData[0].strain_front_rt_2;
      var strain_3R = this.allData[0].strain_front_rt_3;
      
      // Strain calculation placeholder (MUST CHANGE)
      return (strain_1R + strain_2R + strain_3R) / 3;
    }
    else { // if disconnected, return a randomized value
      return Math.floor(Math.random()*100);
    }
  }

  getStrainCenterData() {
    if(this.errors == null) { // if connected, call DB data
      var strain_1C = this.allData[0].strain_center_1;
      var strain_2C = this.allData[0].strain_center_2;
      var strain_3C = this.allData[0].strain_center_3;
      
      // Strain calculation placeholder (MUST CHANGE)
      return (strain_1C + strain_2C + strain_3C) / 3;
    }
    else { // if disconnected, return a randomized value
      return Math.floor(Math.random()*100);
    }
  }

  updateHeatmap() {

    var strainCanvas = document.getElementById("strainGraph");
    
    var left = this.getStrainLeftData();
    var right = this.getStrainRightData();
    var center = this.getStrainCenterData();

    var polarAreaChart = new Chart(strainCanvas, {
        type: 'polarArea',
        data: {
            labels: ["Left Strain","Right Strain","Center Strain"],
            datasets: [{
              backgroundColor: [ "rgba(99, 221, 181, 1)", "rgba(239, 112, 97, 1)", "rgba(255, 212, 93, 1)" ],
              data: [left, right, center],
            }]
           },
        options: {
          animation: {
            duration: 1
            // Effectively, removes the animation from the polar area chat.
            // Hopefully makes the refresh and data display seem more smooth
            // and natural. 
          }
        }
    });

  }

}
