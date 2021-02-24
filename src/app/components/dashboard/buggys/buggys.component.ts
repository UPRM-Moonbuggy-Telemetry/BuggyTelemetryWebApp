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

  getStrainCenterFront() {
    if(this.errors == null) { // if connected, call DB data
      var strain_1 = this.allData[0].strain_center_front_1;
      var strain_2 = this.allData[0].strain_center_front_2;
      var strain_3 = this.allData[0].strain_center_front_3;
  
      // Strain calculation placeholder (MUST CHANGE)
      return (strain_1 + strain_2 + strain_3) / 3;
    }
    else { // if disconnected, return a randomized value
      return Math.floor(Math.random()*100);
    }
  }

  getStrainCenterBack() { // if connected, call DB data
    if(this.errors == null) {
      var strain_1 = this.allData[0].strain_center_back_1;
      var strain_2 = this.allData[0].strain_center_back_2;
      var strain_3 = this.allData[0].strain_center_back_3;
      
      // Strain calculation placeholder (MUST CHANGE)
      return (strain_1 + strain_2 + strain_3) / 3;
    }
    else { // if disconnected, return a randomized value
      return Math.floor(Math.random()*100);
    }
  }

  getStrainBackseat() {
    if(this.errors == null) { // if connected, call DB data
      var strain_1 = this.allData[0].strain_backseat_1;
      var strain_2 = this.allData[0].strain_backseat_2;
      var strain_3 = this.allData[0].strain_backseat_3;
      
      // Strain calculation placeholder (MUST CHANGE)
      return (strain_1 + strain_2 + strain_3) / 3;
    }
    else { // if disconnected, return a randomized value
      return Math.floor(Math.random()*100);
    }
  }

  updateHeatmap() {

    var strainCanvas = document.getElementById("strainGraph");
    
    var center_front = this.getStrainCenterFront();
    var center_back = this.getStrainCenterBack();
    var backseat = this.getStrainBackseat();

    var polarAreaChart = new Chart(strainCanvas, {
        type: 'polarArea',
        data: {
            labels: ["Center-Front Strain","Center-Back Strain","Backseat Strain"],
            datasets: [{
              backgroundColor: [ "rgba(99, 221, 181, 1)", "rgba(239, 112, 97, 1)", "rgba(255, 212, 93, 1)" ],
              data: [center_front, center_back, backseat],
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
