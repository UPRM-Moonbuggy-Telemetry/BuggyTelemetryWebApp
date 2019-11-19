import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

export interface BuggyData {
  id: number;
  strain_front_lft_1: number;
  strain_front_lft_2: number;
  strain_front_lft_3: number;
  strain_front_rt_1: number;
  strain_front_rt_2: number;
  strain_front_rt_3: number;
  strain_center_1: number;
  strain_center_2: number;
  strain_center_3: number;
  vibration_front_lft: number;
  vibration_front_rt: number;
  vibration_rear_lft: number;
  vibration_rear_rt: number;
  vibration_center: number;
  battery_status: number;
  latitude: number;
  longitude: number;
  GSC_time: string;
  GSC_date: string;
  OBC_time: string;
  OBC_date: string;
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

  constructor(private _http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
        /**
          If the query string parameter 'name' is not found, 'New Buggy' is the
          default. Useful in the case that a Buggy haven't been chosen in the
          dropdown options
        **/
        this.table = params.name || 'NewBuggy';
      });
  }

  /**
    This method send a request to the specified route. The '/recent' path is
    used in order to get the most recent data
  **/
  getAllData(): Observable<BuggyData[]> {
    this.ngOnInit();
    return this._http.get<BuggyData[]>('http://localhost:3000/api/' + this.table + '/recent');
  }

  getDataById(id: number): Observable<BuggyData> {
    this.ngOnInit();
    return this._http.get<BuggyData>('http://localhost:3000/api/' + this.table + '/' + id);
  }

  deleteData(id: number): Observable<{}> {
    this.ngOnInit();
    return this._http.delete('http://localhost:3000/api/' + this.table + '/' + id);
  }

  addData(data: BuggyData): Observable<BuggyData> {
    this.ngOnInit();
    return this._http.post<BuggyData>('http://localhost:3000/api/' + this.table, data);
  }

  addMultipleData(data: BuggyData[]): Observable<BuggyData[]> {
    this.ngOnInit();
    return this._http.post<BuggyData[]>('http://localhost:3000/api/' + this.table, data);
  }

  updateData(id: number, data: BuggyData): Observable<BuggyData> {
    this.ngOnInit();
    return this._http.put<BuggyData>('http://localhost:3000/api/' + this.table + '/' + id, data);
  }

  updateSpeedDataRand(min: number, max: number): number {
    return Math.round((Math.random() * (max - min)) + min);
  }

}
