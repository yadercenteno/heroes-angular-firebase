import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  public heroe: any = {
    nombre: '',
    bio: '',
    casa: 'Marvel'
  };

  nuevo = false;
  id: string;

  constructor(private heroeService: HeroesService,
      private router: Router,
      private route: ActivatedRoute) {
        this.route.params
          .subscribe( parametros => {
            this.id = parametros['id'];

            if (this.id !== "nuevo") {
              this.heroeService.getHereo(this.id)
                .subscribe( heroe => this.heroe = heroe );
            }
          });
  }

  ngOnInit(): void {
  }

  guardar() {
    //console.log(this.heroe);

    if (this.id == "nuevo") {
      // Nuevo registro
      this.heroeService.nuevoHeroe( this.heroe )
      .subscribe( (data: any) => {
        //console.log('dato json', data);
        this.router.navigate(['/heroe', data.name]);
      },
      error => {
        console.log(error);
      });
    }
    else {
      // Actualizando los datos de un héroe
      this.heroeService.actualizarHeroe( this.heroe, this.id )
      .subscribe( (data: any) => {
        console.log('dato json', data);
      },
      error => console.log(error));
    }
  }

  agregarNuevo(forma: NgForm) {
    this.router.navigate(['/heroe', 'nuevo']);

    forma.reset({
      casa: 'Marvel'
    });
  }
}
