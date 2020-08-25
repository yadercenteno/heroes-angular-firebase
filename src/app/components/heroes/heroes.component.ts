import { Component, OnInit } from '@angular/core';
import { HeroesService } from "../../services/heroes.service";
import { Heroe } from '../../interfaces/heroe.interface';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: any = [];
  loading = true;

  constructor(private _heroeService: HeroesService) {
    this._heroeService.getHereos()
      .subscribe( data => {
        this.heroes = data;
        this.loading = false;
      });
   }

  ngOnInit(): void {
  }

  borraHeroe(key$: string) {
    this._heroeService.borrarHeroe(key$)
      .subscribe( respuesta => {
        if (respuesta) {
          console.log(respuesta);
        }
        else {
          //Todo salió bien
          delete this.heroes[key$];
        }

      });
  }

}
