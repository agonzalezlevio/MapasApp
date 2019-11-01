import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styles: []
})
export class MapaEditarComponent implements OnInit {

  public forma: FormGroup;

  constructor( public fb: FormBuilder, public dialogRef: MatDialogRef<MapaEditarComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.forma = fb.group({
      titulo: data.titulo,
      descripcion: data.descripcion
    });
              }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public guardarCambios() {
    this.dialogRef.close(this.forma.value);
  }

  ngOnInit() {
  }

}
