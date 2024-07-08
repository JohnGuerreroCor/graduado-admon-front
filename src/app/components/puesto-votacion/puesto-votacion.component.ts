import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
import { NivelAcademico } from 'src/app/models/nivel-academico';
import { PuestoVotacionService } from 'src/app/services/puesto-votacion.service';
import { PuestoVotacion } from 'src/app/models/puesto-votacion';
import { ReportePuestoVotacionExcelService } from 'src/app/services/reporte-puesto-votacion-excel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-puesto-votacion',
  templateUrl: './puesto-votacion.component.html',
  styleUrls: ['./puesto-votacion.component.css'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
  ],
})
export class PuestoVotacionComponent {
  listadoPeriodos: Periodo[] = [];
  listadoFacultades: Facultad[] = [];
  listadoProgramas: ProgramaGeneral[] = [];
  listadoEgresados: ListadoEgresados[] = [];
  listadoNivelAcademico: NivelAcademico[] = [];
  listadoPuestoVotacion: PuestoVotacion[] = [];
  periodo: string = '';
  sede: any;
  nivelFormacion: any;
  nivelAcademico: any;
  dependencia: any;
  programa: number = 0;
  noInformacion: boolean = false;
  precarga: boolean = true;
  buscador: boolean = false;

  dataForExcel: any[] = [];
  dataPuestoVotacion: any[] = [];

  dataSource = new MatTableDataSource<PuestoVotacion>([]);
  displayedColumns: string[] = [
    'index',
    'sede',
    'programa',
    'identificacion',
    'apellido',
    'nombre',
    'puesto',
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
    public egresadoService: EgresadoService,
    public puestoVotacionService: PuestoVotacionService,
    public reportePuestoVotacionExcelService: ReportePuestoVotacionExcelService
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
    this.dataSource = new MatTableDataSource<PuestoVotacion>([]);
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
    this.dataSource = new MatTableDataSource<PuestoVotacion>([]);
    this.noInformacion = true;
    this.precarga = false;
    this.listadoEgresados = [];
    this.puestoVotacionService
      .obtenerListadoPuestoVotacion(this.programa)
      .subscribe((data) => {
        console.log(data);

        if (JSON.stringify(data) == '[]') {
          this.noInformacion = false;
          this.precarga = true;
          this.buscador = false;
        } else {
          this.listadoPuestoVotacion = data;
          this.buscador = true;
          this.dataSource = new MatTableDataSource<PuestoVotacion>(data);
          this.precarga = true;
          this.paginator.firstPage();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.crearDatasource();
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

  crearDatasource() {
    for (let index = 0; index < this.listadoPuestoVotacion.length; index++) {
      this.dataPuestoVotacion.push({
        N: index + 1,
        SEDE: this.listadoPuestoVotacion[index].sede,
        PORGRAMA: this.listadoPuestoVotacion[index].programa,
        'TIPO IDENTIFICACIÓN':
          this.listadoPuestoVotacion[index].identificacionTipo,
        IDENTIFICACIÓN: this.listadoPuestoVotacion[index].identificacion,
        APELLIDO: this.listadoPuestoVotacion[index].apellido,
        NOMBRE: this.listadoPuestoVotacion[index].nombre,
        'PUESTO VOTACIÓN': this.listadoPuestoVotacion[index].puesto,
      });
    }
  }

  puestoVotacionExcel() {
    this.dataPuestoVotacion.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row));
    });
    let fecha = this.datePipe.transform(Date.now(), 'dd-MM-yyyy h:mm a');
    let reportData = {
      title: 'Reporte puesto de votación graduados ' + fecha,
      data: this.dataForExcel,
      headers: Object.keys(this.dataPuestoVotacion[0]),
    };

    this.reportePuestoVotacionExcelService.exportExcel(reportData);
  }
}
