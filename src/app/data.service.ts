import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Cat {
  name: string;
}

export interface TestData {
  id: number;
  strain: number;
  vibracion: number;
}

@Injectable({
  providedIn: 'root'
})

//this class takes care of all data api calls
//if we add another API (images, for example) we should create a new service called ImagesService
//or whichever name is appropriate for the API
export class DataService {

  constructor(private _http: HttpClient) { }

  //CRUD operations
  getAllData(): Observable<TestData[]> {
    return this._http.get<TestData[]>('http://localhost:3000/api/data');
  }

  getData(id: number): Observable<TestData> {
    return this._http.get<TestData>('http://localhost:3000/api/data/' + id);
  }

  insertData(data: TestData): Observable<TestData> {
    return this._http.post<TestData>('http://localhost:3000/api/data/',
    {"strain": data.strain, "vibracion": data.vibracion});
  }

  updateData(data: TestData): Observable<void> {
    return this._http.put<void>('http://localhost:3000/api/data/' + data.id,
    {"strain": data.strain, "vibracion": data.vibracion});
  }

  deleteData(id: number) {
    return this._http.delete('http://localhost:3000/api/data/' + id);
  }

}
