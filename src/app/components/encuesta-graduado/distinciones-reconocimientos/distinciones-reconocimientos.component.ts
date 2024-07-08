import { Component, ViewChild, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { GraduadoService } from 'src/app/services/graduado.service';
import { FotoService } from 'src/app/services/foto.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { MencionReconocimiento } from 'src/app/models/mencion-reconocimiento';
import { MencionReconocimientoService } from 'src/app/services/mencion-reconocimiento.service';

@Component({
  selector: 'app-distinciones-reconocimientos',
  templateUrl: './distinciones-reconocimientos.component.html',
  styleUrls: ['./distinciones-reconocimientos.component.css'],
})
export class DistincionesReconocimientosComponent {
  listadoRespuestas: MencionReconocimiento[] = [];

  identificacion: string = '';

  dataSource = new MatTableDataSource<MencionReconocimiento>([]);
  displayedColumns: string[] = [
    'index',
    'ambito',
    'institucion',
    'titulo',
    'municipio',
    'fecha',
  ];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    public graduadoService: GraduadoService,
    public fotoService: FotoService,
    public ubicacionService: UbicacionService,
    public datosPersonalesService: DatosPersonalesService,
    public mencionReconocimientoService: MencionReconocimientoService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.identificacion = params['id'];
      this.mencionReconocimientoService
        .obtenerMencionesReconocimiento(this.identificacion)
        .subscribe((data) => {
          this.listadoRespuestas = data;
          this.dataSource = new MatTableDataSource<MencionReconocimiento>(data);
          this.paginator.firstPage();
          this.dataSource.paginator = this.paginator;
          console.log(this.listadoRespuestas);
        });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalMembresia, { width: '60%' });
  }
}

//// MODAL

@Component({
  selector: 'modal-membresia',
  templateUrl: 'modal-membresia.html',
  styleUrls: ['./distinciones-reconocimientos.component.css'],
})
export class ModalMembresia {
  constructor(
    public dialogRef: MatDialogRef<ModalMembresia>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
