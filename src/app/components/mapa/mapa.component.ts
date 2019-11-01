import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  public marcadores: Marcador[] = [];

  public lat = 51.678418;
  public lng = 7.809007;

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {
    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    } else {
      this.marcadores = [];
    }
  }

  ngOnInit() {
  }

  public editarMarcador(marcador: Marcador): void {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, descripcion: marcador.descripcion}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }
      marcador.titulo = result.titulo;
      marcador.descripcion = result.descripcion;
      this.guadarStorage();
      this.snackBar.open('Marcador Actualizado', 'Cerrar', {duration: 3000});
    });
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
