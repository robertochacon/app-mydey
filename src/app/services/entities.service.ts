import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  url: string = '';

  constructor(private http: HttpClient, private helper: HelperService) { 
    this.url =  helper.getUrl('entities');
  }

  getAllEntities(id_user:any): Observable<any>{
    const url = this.url+'/all/'+id_user;
    return this.http.get(url);
  }

  getEntity(id:any): Observable<any>{
    const url = this.url+'/'+id;
    return this.http.get(url);
  }

  setEntities(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  updateEntities(id: number, json: any): Observable<any>{
    const url = this.url+'/'+id;
    return this.http.post(url, json);
  }

  deleteEntities(id: number): Observable<any>{
    const url = this.url+'/'+id;
    return this.http.delete(url);
  }

}
