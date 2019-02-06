 import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

export interface BuggyData {
  id: number,
  strain_sensor_1: number,
  strain_sensor_2: number,
  strain_sensor_3: number,
  strain_sensor_4: number,
  vibration_sensor_1: number,
  vibration_sensor_2: number,
  vibration_sensor_3: number,
  vibration_sensor_4: number,
  vibration_sensor_5: number,
  battery_status: number,
  latitude: number,
  longitude: number,
  GSC_time: string,
  GSC_date: string
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
    return this._http.get<BuggyData[]>('http://localhost:3000/api/NewBuggy');
  }

  getData(id: number): Observable<BuggyData> {
    return this._http.get<BuggyData>('http://localhost:3000/api/NewBuggy/' + id);
  }

}
