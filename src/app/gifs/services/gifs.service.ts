import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGiftsResponse, Gif } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey     : string = 'iFUoKHubRpn8nXyRkDio8WL54jze1RkO'
  private servicioUrl: string = 'http://api.giphy.com/v1/gifs';
  private _historial : string[] = [];
 

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string ) {

    query = query.trim().toLocaleLowerCase()

    if( !this.historial.includes( query )) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial ))
    }

    const params = new HttpParams()
          .set('api_key', this.apikey)
          .set('limit', '10')
          .set('q', query);

         
    
    this.http.get<SearchGiftsResponse>(`${ this.servicioUrl }/search`, { params:params })
      .subscribe( (resp ) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify( this.resultados ))

      });
    
  }

  



}
