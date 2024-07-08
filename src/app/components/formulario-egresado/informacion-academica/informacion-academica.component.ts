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
import { HabilidadInformatica } from 'src/app/models/habilidad-informatica';
import { InformacionAcademicaService } from 'src/app/services/informacion-academica.service';
import { Idioma } from 'src/app/models/idioma';
import { RegistroEducativo } from 'src/app/models/registro-educativo';
import { DatosComplementarios } from '../../../models/datos-complementarios';
import { Graduado } from 'src/app/models/graduado';

@Component({
  selector: 'app-informacion-academica',
  templateUrl: './informacion-academica.component.html',
  styleUrls: ['./informacion-academica.component.css'],
})
export class InformacionAcademicaComponent {
  identificacion: string = '';
  graduado: Graduado[] = [];
  listadoHabilidadInformatica: HabilidadInformatica[] = [];
  listadoRegistroEducativo: RegistroEducativo[] = [];
  listadoIdioma: Idioma[] = [];
  datosComplementarios: DatosComplementarios[] = [];

  dataSourceRegistroEducativo = new MatTableDataSource<RegistroEducativo>([]);
  displayedColumnsRegistroEducativo: string[] = [
    'index',
    'nombre',
    'nivel',
    'fecha',
    'entidad',
    'titulo',
  ];
  @ViewChild(MatPaginator, { static: false })
  paginatorRegistroEducativo!: MatPaginator;

  dataSourceHabilidadInformatica = new MatTableDataSource<HabilidadInformatica>(
    []
  );
  displayedColumnsHabilidadInformatica: string[] = [
    'index',
    'programa',
    'dominio',
  ];
  @ViewChild(MatPaginator, { static: false })
  paginatorHabilidadInformatica!: MatPaginator;

  dataSourceIdioma = new MatTableDataSource<Idioma>([]);
  displayedColumnsIdioma: string[] = [
    'index',
    'idioma',
    'conversacion',
    'escritura',
    'lectura',
  ];
  @ViewChild(MatPaginator, { static: false })
  paginatorIdioma!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    public graduadoService: GraduadoService,
    public fotoService: FotoService,
    public informacionAcademicaService: InformacionAcademicaService,
    private datePipe: DatePipe
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.identificacion = params['id'];
      this.informacionAcademicaService
        .obtenerHabilidadesInformaticas(this.identificacion)
        .subscribe((data) => {
          this.listadoHabilidadInformatica = data;
          this.dataSourceHabilidadInformatica =
            new MatTableDataSource<HabilidadInformatica>(data);
          this.paginatorHabilidadInformatica.firstPage();
          this.dataSourceHabilidadInformatica.paginator =
            this.paginatorHabilidadInformatica;
        });
      this.informacionAcademicaService
        .obtenerIdiomas(this.identificacion)
        .subscribe((data) => {
          this.listadoIdioma = data;
          this.dataSourceIdioma = new MatTableDataSource<Idioma>(data);
          this.paginatorIdioma.firstPage();
          this.dataSourceIdioma.paginator = this.paginatorIdioma;
        });
      this.informacionAcademicaService
        .obtenerRegistroEducativo(this.identificacion)
        .subscribe((data) => {
          this.listadoRegistroEducativo = data;
          this.dataSourceRegistroEducativo =
            new MatTableDataSource<RegistroEducativo>(data);
          this.paginatorRegistroEducativo.firstPage();
          this.dataSourceRegistroEducativo.paginator = this.paginatorIdioma;
        });
      this.informacionAcademicaService
        .obtenerDatosComplementarios(this.identificacion)
        .subscribe((data) => {
          this.datosComplementarios = data;
        });
      this.graduadoService
        .obtenerGraduado(this.identificacion)
        .subscribe((data) => {
          this.graduado = data;
        });
    });
  }
}
