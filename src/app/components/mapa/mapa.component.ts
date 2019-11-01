import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  public marcadores: Marcador[] = [];

  public lat = 51.678418;
  public lng = 7.809007;

  constructor() {
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
  }


  public guadarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  public borrarMarcador(id: number) {
    this.marcadores.splice(id, 1);
    this.guadarStorage();
  }

}
