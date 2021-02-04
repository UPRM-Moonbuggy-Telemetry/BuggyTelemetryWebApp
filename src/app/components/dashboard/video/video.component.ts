import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JSMpeg } from '../../../../assets/js/jsmpeg-master/jsmpeg.min.js';
declare var JSMpeg: any;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {  
  @ViewChild('video', { static: true }) video: ElementRef;

  ngOnInit(){
    var canvas = this.video.nativeElement;
    var url = 'ws://'+document.location.hostname+':8082/';
    var player = new JSMpeg.Player(url, {canvas: canvas});
  }

}
