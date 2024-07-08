import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
import { TasaGraduacionPeriodo } from 'src/app/models/tasa-graduacion-periodo';
import { TasaGraduacionService } from 'src/app/services/tasa-graduacion.service';
import { TasaGraduacionSemestre } from 'src/app/models/tasa-graduacion-semestre';
import { TasaGraduacionPersonas } from 'src/app/models/tasa-graduacion-personas';
import { ReporteTasaGraduacionExcelService } from 'src/app/services/reporte-tasa-graduacion-excel.service';
import { MatriculadosPrimerIngreso } from 'src/app/models/matriculados-primer-ingreso';
import { GraduadosPeriodoAcademico } from 'src/app/models/graduados-periodo-academico';

export class graduado {
  grado!: string;
  graduado!: number;
}

@Component({
  selector: 'app-tasa-graduacion',
  templateUrl: './tasa-graduacion.component.html',
  styleUrls: ['./tasa-graduacion.component.css'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
  ],
})
export class TasaGraduacionComponent {
  informacionPrograma: TasaGraduacionSemestre[] = [];
  matriculadosPrimerIngreso: MatriculadosPrimerIngreso[] = [];
  graduadosPeriodoAcademico: GraduadosPeriodoAcademico[] = [];

  listadoPeriodos: Periodo[] = [];
  listadoFacultades: Facultad[] = [];
  listadoProgramas: ProgramaGeneral[] = [];
  listadoEgresados: ListadoEgresados[] = [];
  listadoNivelAcademico: NivelAcademico[] = [];
  listadoTasaPeriodo: TasaGraduacionPeriodo[] = [];
  listadoTasaGraduadosPeriodo: graduado[] = [];
  sede: any;
  nivelFormacion: any;
  nivelAcademico: any;
  dependencia: any;
  programa: number = 0;
  noInformacion: boolean = false;
  precarga: boolean = true;
  buscador: boolean = false;
  tabla: boolean = false;

  sedeNombre: string = '';
  nivelFormacionNombre: string = '';
  nivelAcademicoNombre: string = '';
  dependenciaNombre: string = '';
  programaNombre: string = '';

  semestre: TasaGraduacionSemestre[] = [];
  periodoInicial!: string;
  periodoFinal!: string;
  periodosGraduados: TasaGraduacionPeriodo[] = [];
  listadoEstudiantes: TasaGraduacionPersonas[] = [];
  listadoGraduados: TasaGraduacionPersonas[] = [];

  resultadoFinal: any[] = [];

  dataForExcel: any[] = [];
  dataTasaGraduacion: any[] = [];

  dataSource = new MatTableDataSource<ListadoEgresados>([]);
  displayedColumns: string[] = [
    'index',
    'programa',
    'cohorteInicial',
    'primerIngreso',
    'duracionSemestres',
    'cohorteFinal',
    'numeroGraduado',
    'tasa',
  ];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSourceMatriculadosPrimerIngreso =
    new MatTableDataSource<MatriculadosPrimerIngreso>([]);
  displayedColumnsMatriculadosPrimerIngreso: string[] = [
    'index',
    'periodo',
    'matriculados',
  ];
  @ViewChild(MatPaginator, { static: false })
  paginatorMatriculadosPrimerIngreso!: MatPaginator;

  constructor(
    public graduadoService: GraduadoService,
    public fotoService: FotoService,
    private datePipe: DatePipe,
    public consultaGeneralService: ConsultaGeneralService,
    public egresadoService: EgresadoService,
    public tasaGraduacionService: TasaGraduacionService,
    public reporteTasaGraduacionExcelService: ReporteTasaGraduacionExcelService
  ) {}

  ngOnInit(): void {
    this.consultaGeneralService.obtenerPeriodos().subscribe((data) => {
      this.listadoPeriodos = data;
    });
    this.consultaGeneralService.obtenerFacultades().subscribe((data) => {
      this.listadoFacultades = data;
    });
  }

  obtenerInformacionPrograma(programaCodigo: number) {
    this.tasaGraduacionService
      .obtenerInformacionPrograma(programaCodigo)
      .subscribe((data) => {
        this.informacionPrograma = data;
      });
    this.tasaGraduacionService
      .obtenerMatriculadosPrimerIngreso(programaCodigo)
      .subscribe((data) => {
        this.matriculadosPrimerIngreso = data;
        this.dataSourceMatriculadosPrimerIngreso =
          new MatTableDataSource<MatriculadosPrimerIngreso>(data);
        this.paginatorMatriculadosPrimerIngreso.firstPage();
        this.dataSourceMatriculadosPrimerIngreso.paginator =
          this.paginatorMatriculadosPrimerIngreso;
      });
    this.tasaGraduacionService
      .obtenerGraduadosPeriodoAcademico(programaCodigo)
      .subscribe((data) => {
        this.graduadosPeriodoAcademico = data;
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

  /*  obtenerPeriodosMatriculados() {
    this.noInformacion = true;
    this.precarga = false;
    this.tasaGraduacionService
      .obtenerSemestresPrograma(this.programa)
      .subscribe((data) => {
        this.semestre = data;
        if (JSON.stringify(data) != '[]') {
          this.tasaGraduacionService
            .obtenerPeriodosMatriculados(this.programa)
            .subscribe((data) => {
              if (JSON.stringify(data) != '[]') {
                this.periodosGraduados = data.slice(0, 10);
                data.splice(0, this.semestre[0].semestre);
                this.listadoTasaPeriodo = data.slice(0, 11);
                this.periodoInicial = data[data.length - 1].periodo;
                this.periodoFinal = data[0].periodo;
                console.log(
                  data,
                  'Periodo Inicial: ',
                  data[0].periodo,
                  'Periodo Final: ',
                  data[data.length - 1].periodo,
                  this.periodosGraduados
                );
                this.obtenerPrimerIngreso();
              } else {
                this.noInformacion = false;
                this.precarga = true;
                this.buscador = false;
              }
            });
        }
      });
  } */

  obtenerPrimerIngreso() {
    this.listadoTasaPeriodo.splice(0, 1);
    for (let index = 0; index < this.listadoTasaPeriodo.length; index++) {
      this.tasaGraduacionService
        .obtenerEstudiantesPrimerIngreso(
          this.programa,
          this.listadoTasaPeriodo[index].periodo,
          this.listadoTasaPeriodo[index].periodo
        )
        .subscribe((data) => {
          this.listadoEstudiantes = data;
          this.tasaGraduacionService
            .obtenerGraduados(
              this.programa,
              this.periodosGraduados[index].periodo
            )
            .subscribe((data) => {
              this.listadoGraduados = data;
              let count = 0;
              for (let i = 0; i < this.listadoEstudiantes.length; i++) {
                for (let j = 0; j < this.listadoGraduados.length; j++) {
                  console.log(
                    this.listadoEstudiantes[i].estudianteCodigo,
                    '==',
                    this.listadoGraduados[j].estudianteCodigo,
                    '::',
                    this.listadoEstudiantes[i].estudianteCodigo ==
                      this.listadoGraduados[j].estudianteCodigo
                  );
                  if (
                    this.listadoEstudiantes[i].estudianteCodigo ==
                    this.listadoGraduados[j].estudianteCodigo
                  ) {
                    count = count + 1;
                  }
                }
              }
              this.listadoTasaGraduadosPeriodo.push({
                grado: this.periodosGraduados[index].periodo,
                graduado: count,
              });
              //console.log(this.listadoTasaGraduadosPeriodo);
            });
        });
    }
    this.tabla = true;
  }

  arregloFinal() {
    this.listadoTasaGraduadosPeriodo.sort((a, b) => +b.grado - +a.grado);

    console.log(this.listadoTasaGraduadosPeriodo);
    console.log(
      this.listadoTasaPeriodo.length,
      this.listadoTasaGraduadosPeriodo.length
    );

    for (
      let index = 0;
      index < this.listadoTasaGraduadosPeriodo.length;
      index++
    ) {
      this.resultadoFinal.push({
        programa: this.programaNombre,
        cohorteInicial: this.listadoTasaPeriodo[index].periodo,
        primerIngreso: +this.listadoTasaPeriodo[index].cantidadMatriculados,
        //duracionSemestres: this.semestre[0].semestre,
        cohorteFinal: this.listadoTasaGraduadosPeriodo[index].grado,
        numeroGraduado: this.listadoTasaGraduadosPeriodo[index].graduado,
      });
    }
    this.dataSource = new MatTableDataSource<any>(this.resultadoFinal);
    this.buscador = true;
    this.precarga = true;
    this.precarga = true;
    this.paginator.firstPage();
    this.dataSource.paginator = this.paginator;
    this.crearDatasource();
  }

  crearDatasource() {
    for (let index = 0; index < this.resultadoFinal.length; index++) {
      let porcentaje = Number(
        (
          this.resultadoFinal[index].numeroGraduado /
          this.resultadoFinal[index].primerIngreso
        ).toFixed(2)
      );
      let texto = porcentaje * 100 + '%';
      this.dataTasaGraduacion.push({
        N: index + 1,
        PROGRAMA: this.resultadoFinal[index].programa,
        'COHORTE INICIAL': this.resultadoFinal[index].cohorteInicial,
        PRIMERINGRESO: this.resultadoFinal[index].primerIngreso,
        'DURACIÓN SEMESTRES': this.resultadoFinal[index].duracionSemestres,
        'COHORTE FINAL': this.resultadoFinal[index].cohorteFinal,
        'NÚMERO GRADUADOS': this.resultadoFinal[index].numeroGraduado,
        'TASA GRADUACIÓN': texto,
      });
    }
  }

  puestoVotacionExcel() {
    this.dataTasaGraduacion.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row));
    });
    let fecha = this.datePipe.transform(Date.now(), 'dd-MM-yyyy h:mm a');
    let reportData = {
      title: 'Reporte puesto de votación graduados ' + fecha,
      data: this.dataForExcel,
      headers: Object.keys(this.dataTasaGraduacion[0]),
    };

    this.reporteTasaGraduacionExcelService.exportExcel(reportData);
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarSede(element: string) {
    this.sedeNombre = element;
  }
  cargarNivelAcademico(element: string) {
    this.nivelAcademico = element;
  }
  cargarNivelFormacion(element: string) {
    this.nivelFormacion = element;
  }
  cargarDependencia(element: string) {
    this.dependenciaNombre = element;
  }
  cargarProgram(element: string) {
    this.programaNombre = element;
  }
}
