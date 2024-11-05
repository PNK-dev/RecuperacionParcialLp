import { Injectable } from '@angular/core';
import { Marca } from '../model/marca';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl = 'http://localhost:8080/api/marca'
  constructor(private http: HttpClient) { }
  getMarca():Observable<Marca[]>{
    return this.http.get<Marca[]>(this.apiUrl);
  }

  getMarcaById(id: number):Observable<Marca>{
    return this.http.get<Marca>(`${this.apiUrl}/${id}`);
  }

  createMarca(Marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(this.apiUrl, Marca);
  }

  deleteMarca(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateMarca(Marca: Marca, id: number): Observable<Marca> {
    return this.http.put<Marca>(`${this.apiUrl}/${id}`, Marca);
  }
}
