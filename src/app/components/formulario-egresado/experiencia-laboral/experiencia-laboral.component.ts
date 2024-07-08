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
import { DatePipe } from '@angular/common';
import { DatosComplementarios } from '../../../models/datos-complementarios';
import { Graduado } from 'src/app/models/graduado';
import { HistorialLaboralService } from '../../../services/historial-laboral.service';
import { HistorialLaboral } from 'src/app/models/historial-laboral';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css'],
})
export class ExperienciaLaboralComponent {
  identificacion: string = '';
  graduado: Graduado[] = [];
  listadoHistorialLaboral: HistorialLaboral[] = [];
  datosComplementarios: DatosComplementarios[] = [];

  dataSourceHistorialLaboral = new MatTableDataSource<HistorialLaboral>([]);
  displayedColumnsHistorialLaboral: string[] = [
    'index',
    'cargo',
    'funcion',
    'empresa',
    'fechaInicio',
    'fechaFin',
  ];
  @ViewChild(MatPaginator, { static: false })
  paginatorHistorialLaboral!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    public graduadoService: GraduadoService,
    public fotoService: FotoService,
    public historialLaboralService: HistorialLaboralService,
    private datePipe: DatePipe
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.identificacion = params['id'];
      this.historialLaboralService
        .obtenerHistorialLaboral(this.identificacion)
        .subscribe((data) => {
          this.listadoHistorialLaboral = data;
          this.dataSourceHistorialLaboral =
            new MatTableDataSource<HistorialLaboral>(data);
          this.paginatorHistorialLaboral.firstPage();
          this.dataSourceHistorialLaboral.paginator =
            this.paginatorHistorialLaboral;
        });
    });
  }
}
