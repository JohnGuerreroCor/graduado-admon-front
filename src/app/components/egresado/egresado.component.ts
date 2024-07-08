import { Component, ViewChild, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { GraduadoService } from 'src/app/services/graduado.service';
import { FotoService } from 'src/app/services/foto.service';
import { DatePipe } from '@angular/common';
import { ConsultaGeneralService } from '../../services/consulta-general.service';
import { Periodo } from 'src/app/models/periodo';
import { Facultad } from 'src/app/models/facultad';
import { ProgramaGeneral } from 'src/app/models/programa-general';
import { ListadoEgresados } from 'src/app/models/listado-egresados';
import { EgresadoService } from 'src/app/services/egresado.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import Swal from 'sweetalert2';
import { NivelAcademico } from 'src/app/models/nivel-academico';

@Component({
  selector: 'app-egresado',
  templateUrl: './egresado.component.html',
  styleUrls: ['./egresado.component.css'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
  ],
})
export class EgresadoComponent implements OnInit {
  listadoPeriodos: Periodo[] = [];
  listadoFacultades: Facultad[] = [];
  listadoProgramas: ProgramaGeneral[] = [];
  listadoEgresados: ListadoEgresados[] = [];
  listadoNivelAcademico: NivelAcademico[] = [];
  periodo: string = '';
  sede: any;
  nivelFormacion: any;
  nivelAcademico: any;
  dependencia: any;
  programa: number = 0;
  noInformacion: boolean = false;
  precarga: boolean = true;
  buscador: boolean = false;

  dataSource = new MatTableDataSource<ListadoEgresados>([]);
  displayedColumns: string[] = [
    'index',
    'periodo',
    'sede',
    'nivelFormacion',
    'nivelAcademico',
    'dependencia',
    'programa',
    'estudianteCodigo',
    'estudianteNombre',
    'matriculaTipo',
    'informacion',
  ];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public graduadoService: GraduadoService,
    public fotoService: FotoService,
    private datePipe: DatePipe,
    public consultaGeneralService: ConsultaGeneralService,
    public egresadoService: EgresadoService
  ) {}

  ngOnInit(): void {
    this.consultaGeneralService.obtenerPeriodos().subscribe((data) => {
      this.listadoPeriodos = data;
    });
    this.consultaGeneralService.obtenerFacultades().subscribe((data) => {
      this.listadoFacultades = data;
    });
  }

  obtenerNivelesAcademicos(element: any) {
    this.consultaGeneralService
      .obtenerNivelesAcademicos(element)
      .subscribe((data) => {
        this.listadoNivelAcademico = data;
      });
  }

  obtenerProgramas() {
    this.listadoProgramas = [];
    this.programa = 0;
    this.dataSource = new MatTableDataSource<ListadoEgresados>([]);
    this.noInformacion = false;
    this.precarga = true;
    this.consultaGeneralService
      .obtenerProgramasFacultad(
        this.sede,
        this.nivelAcademico,
        this.dependencia
      )
      .subscribe((data) => {
        this.listadoProgramas = data;
      });
  }

  obtenerListadoEgresadosFacultad() {
    this.noInformacion = true;
    this.precarga = false;
    this.listadoEgresados = [];
    this.egresadoService
      .obtenerListadoEgresadosFacultad(this.periodo, this.programa)
      .subscribe((data) => {
        if (JSON.stringify(data) == '[]') {
          this.noInformacion = false;
          this.precarga = true;
          this.buscador = false;
        } else {
          this.buscador = true;
          this.listadoEgresados = data;
          this.dataSource = new MatTableDataSource<ListadoEgresados>(data);
          this.precarga = true;
          this.paginator.firstPage();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
