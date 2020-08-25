import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroesUrl: string = 'https://heroesapp-e021c.firebaseio.com/heroes.json';
  heroeUrl: string = 'https://heroesapp-e021c.firebaseio.com/heroes/';

  constructor(private http: HttpClient) { }

  nuevoHeroe( heroe: Heroe) {
    let body = JSON.stringify( heroe );
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.http.post( this.heroesUrl, body, {headers} );
  }

  actualizarHeroe( heroe: Heroe, key$: string) {
    let body = JSON.stringify( heroe );
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let url = `${ this.heroeUrl }/${ key$ }.json`;

    return this.http.put( url, body, {headers} );
  }

  getHereo(key$: string) {
    let url = `${ this.heroeUrl }/${ key$ }.json`;

    return this.http.get(url );
  }

  getHereos() {
    return this.http.get( this.heroesUrl );
  }

  borrarHeroe( key$: string) {
    let url = `${ this.heroeUrl }/${ key$ }.json`;

    return this.http.delete ( url );
  }
}
