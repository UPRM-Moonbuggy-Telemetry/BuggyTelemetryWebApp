import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

export interface OldRoverData {
  id: number;
  strain_center_front_1: number;
  strain_center_front_2: number;
  strain_center_front_3: number;
  strain_center_back_1: number;
  strain_center_back_2: number;
  strain_center_back_3: number;
  strain_frontseat_1: number;
  strain_frontseat_2: number;
  strain_frontseat_3: number;
  vibration_backseat_top: number;
  vibration_backseat_bottom: number;
  vibration_front_right: number;
  vibration_front_left: number;
  battery_status: number;
  latitude: number;
  longitude: number;
  GSC_time: string;
  GSC_date: string;
  OBC_time: string;
  OBC_date: string;
}

export interface NewRoverData {
  id: number;
  strain_center_front_1: number;
  strain_center_front_2: number;
  strain_center_front_3: number;
  strain_center_back_1: number;
  strain_center_back_2: number;
  strain_center_back_3: number;
  strain_backseat_1: number;
  strain_backseat_2: number;
  strain_backseat_3: number;
  vibration_front_lft: number;
  vibration_front_rt: number;
  vibration_rear_lft: number;
  vibration_rear_rt: number;
  vibration_center_back: number;
  battery_status: number;
  latitude: number;
  longitude: number;
  OBC_time: string;
  OBC_date: string;
  GSC_time: string;
  GSC_date: string;
}

@Injectable({
  providedIn: 'root'
})

/**
 This class takes care of all data api calls if we add another
 API (images, for example) we should create a new service called
 ImagesService or whichever name is appropriate for the API
 **/
export class DataService implements OnInit {

  table: string;
  sub: any;
  url = 'http://localhost:3000/api/';

  constructor(private _http: HttpClient, private route: ActivatedRoute) {
  }

  /* UPDATE: We will assume that all data shown in the app is from the New Rover. */

  ngOnInit() {
    // this.sub = this.route.queryParams.subscribe(params => {
    //   /**
    //    If the query string parameter 'name' is not found, 'New Buggy' is the
    //    default. Useful in the case that a Buggy haven't been chosen in the
    //    dropdown options
    //    **/
    //   this.table = params.name || 'NewRover';
    // });
    this.table = 'NewRover';
  }

  /**
   This method send a request to the specified route. The '/recent' path is
   used in order to get the most recent data
   **/
  getAllData(): Observable<NewRoverData[]> {
    this.ngOnInit();
    return this._http.get<NewRoverData[]>(this.url + this.table + '/recent');
  }

  getDataById(id: number): Observable<NewRoverData> {
    this.ngOnInit();
    return this._http.get<NewRoverData>(this.url + this.table + '/' + id);
  }

  deleteData(id: number): Observable<{}> {
    this.ngOnInit();
    return this._http.delete(this.url + this.table + '/' + id);
  }

  clear(): Observable<{}> {
    this.ngOnInit();
    return this._http.delete(this.url + this.table);
  }

  addData(data: NewRoverData): Observable<NewRoverData> {
    this.ngOnInit();
    return this._http.post<NewRoverData>(this.url + this.table, data);
  }

  addMultipleData(data: NewRoverData[]): Observable<NewRoverData[]> {
    this.ngOnInit();
    return this._http.post<NewRoverData[]>(this.url + this.table, data);
  }

  updateData(id: number, data: NewRoverData): Observable<NewRoverData> {
    this.ngOnInit();
    return this._http.put<NewRoverData>(this.url + this.table + '/' + id, data);
  }

  /* Test method for speedometer */
  updateSpeedDataRand(min: number, max: number): number {
    return Math.round((Math.random() * (max - min)) + min);
  }

}
