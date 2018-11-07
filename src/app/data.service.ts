import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Cat {
  name: string;
}

@Injectable({
  providedIn: 'root'
})

//this class takes care of all data api calls
//if we add another API (images, for example) we should create a new service called ImagesService
//or whichever name is appropriate for the API
export class DataService {

  constructor(private _http: HttpClient) { }

  getAllCats(): Observable<Cat[]> {
    return this._http.get<Cat[]>('http://localhost:3000/api/data');
  }

  getCat(name: string): Observable<Cat> {
    return this._http.get<Cat>('http://localhost:3000/api/data/' + name);
  }

  insertCat(cat: Cat): Observable<Cat> {
    return this._http.post<Cat>('http://localhost:3000/api/data/', cat);
  }

  updateCat(cat: Cat): Observable<void> {
    return this._http.put<void>('http://localhost:3000/api/data/' + cat.name, cat);
  }

  deleteCat(name: string) {
    return this._http.delete('http://localhost:3000/api/data/' + name);
  }

}
