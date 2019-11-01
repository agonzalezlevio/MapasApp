import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  public marcadores: Marcador[] = [];

  public lat = 51.678418;
  public lng = 7.809007;

  constructor(private snackBar: MatSnackBar) {
    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    } else {
      this.marcadores = [];
    }
  }

  ngOnInit() {
  }

  public agregarMarcador(evento: any) {
    const coords: {lat: number, lng: number} = evento.coords;

    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(nuevoMarcador);
    this.guadarStorage();
    this.snackBar.open('Marcador agregado', 'Cerrar', {duration: 3000});

  }


  public guadarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  public borrarMarcador(id: number) {
    this.marcadores.splice(id, 1);
    this.guadarStorage();
    this.snackBar.open('Marcador borrado', 'Cerrar', {duration: 3000});
  }

}
