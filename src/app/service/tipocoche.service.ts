import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipocoche } from '../model/tipocoche';

@Injectable({
  providedIn: 'root'
})
export class TipoCocheService {
  private apiUrl = 'http://localhost:8080/api/tipoTipoCoche'
  constructor(private http: HttpClient) { }
  getTipoCoche():Observable<Tipocoche[]>{
    return this.http.get<Tipocoche[]>(this.apiUrl);
  }

  getTipoCocheById(id: number):Observable<Tipocoche>{
    return this.http.get<Tipocoche>(`${this.apiUrl}/${id}`);
  }

  createTipoCoche(TipoCoche: Tipocoche): Observable<Tipocoche> {
    return this.http.post<Tipocoche>(this.apiUrl, TipoCoche);
  }

  deleteTipoCoche(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTipoCoche(TipoCoche: Tipocoche, id: number): Observable<Tipocoche> {
    return this.http.put<Tipocoche>(`${this.apiUrl}/${id}`, TipoCoche);
  }
}