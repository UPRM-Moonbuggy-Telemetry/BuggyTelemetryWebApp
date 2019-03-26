import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

export interface BuggyData {
  id: number,
  strain_front_lft_1: number,
  strain_front_lft_2: number,
  strain_front_lft_3: number,
  strain_front_rt_1: number,
  strain_front_rt_2: number,
  strain_front_rt_3: number,
  strain_center_1: number,
  strain_center_2: number,
  strain_center_3: number,
  vibration_front_lft: number,
  vibration_front_rt: number,
  vibration_rear_lft: number,
  vibration_rear_rt: number,
  vibration_center: number,
  battery_status: number,
  latitude: number,
  longitude: number,
  GSC_time: string,
  GSC_date: string,
  OBC_time: string,
  OBC_date: string
}

@Injectable({
  providedIn: 'root'
})

/**
  This class takes care of all data api calls if we add another
  API (images, for example) we should create a new service called
  ImagesService or whichever name is appropriate for the API
**/
export class DataService {

  constructor(private _http: HttpClient) { }

  //CRUD operations
  getAllData(): Observable<BuggyData[]> {
    return this._http.get<BuggyData[]>('http://localhost:3000/api/NewBuggy/recent');
  }

  getData(id: number): Observable<BuggyData> {
    return this._http.get<BuggyData>('http://localhost:3000/api/NewBuggy/' + id);
  }

}
