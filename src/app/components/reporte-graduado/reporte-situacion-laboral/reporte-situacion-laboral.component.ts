import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { GraduadoService } from 'src/app/services/graduado.service';
import { FotoService } from 'src/app/services/foto.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import { SituacionLaboralService } from 'src/app/services/situacion-laboral.service';
import { ReporteSituacionLaboralExcelService } from 'src/app/services/reporte-situacion-laboral-excel.service';
import { ReporteSituacionLaboral } from 'src/app/models/reporte-situacion-laboral';

@Component({
  selector: 'app-reporte-situacion-laboral',
  templateUrl: './reporte-situacion-laboral.component.html',
  styleUrls: ['./reporte-situacion-laboral.component.css'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
  ],
})
export class ReporteSituacionLaboralComponent {
  datosSituacionLaboral: ReporteSituacionLaboral[] = [];
  fechaInicio!: Date;
  fechaFin!: Date;

  dataForExcel: any[] = [];
  dataSituacionLaboral: any[] = [];

  noInformacion: boolean = false;
  precarga: boolean = true;
  buscador: boolean = false;

  dataSource = new MatTableDataSource<ReporteSituacionLaboral>([]);
  displayedColumns: string[] = [
    'index',
    'graduado',
    'pregunta1',
    'pregunta2',
    'pregunta3',
    'pregunta4',
    'pregunta5',
    'pregunta6',
    'pregunta7',
    'pregunta8',
    'pregunta9',
    'pregunta10',
    'fecha',
  ];
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

  constructor(
    private activatedRoute: ActivatedRoute,
    public graduadoService: GraduadoService,
    public fotoService: FotoService,
    public ubicacionService: UbicacionService,
    public datosPersonalesService: DatosPersonalesService,
    public situacionLaboralService: SituacionLaboralService,
    public reporteSituacionLaboralExcelService: ReporteSituacionLaboralExcelService,
    private datePipe: DatePipe
  ) {}

  obtenerReporte() {
    this.noInformacion = true;
    this.precarga = false;
    let inicio = this.datePipe.transform(this.fechaInicio, 'yyyy-MM-dd');
    let fin = this.datePipe.transform(this.fechaFin, 'yyyy-MM-dd');
    this.situacionLaboralService
      .obtenerRerporteSituacionLaboral(inicio, fin)
      .subscribe((data) => {
        if (JSON.stringify(data) == '[]') {
          this.noInformacion = false;
          this.precarga = true;
        } else {
          this.datosSituacionLaboral = data;
          this.precarga = true;
          this.dataSource = new MatTableDataSource<ReporteSituacionLaboral>(
            data
          );
          this.paginator.firstPage();
          this.dataSource.paginator = this.paginator;
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
    for (let index = 0; index < this.datosSituacionLaboral.length; index++) {
      this.dataSituacionLaboral.push({
        N: index + 1,
        GRADUADO:
          this.datosSituacionLaboral[index].personaNombre +
          ' ' +
          this.datosSituacionLaboral[index].personaApellido,
        '¿Trabaja en la actualidad?':
          this.datosSituacionLaboral[index].columnas!['columna0'],
        '¿En qué sector trabaja?':
          this.datosSituacionLaboral[index].columnas!['columna1'],
        '¿Cuál es su rol o posición en esa actividad?':
          this.datosSituacionLaboral[index].columnas!['columna2'],
        '¿Es este su primer empleo?':
          this.datosSituacionLaboral[index].columnas!['columna3'],
        '¿Cuántos meses después de graduarse obtuvo su primer empleo?':
          this.datosSituacionLaboral[index].columnas!['columna4'],
        '¿Qué método o canal de búsqueda le permitió conseguir su empleo actual?':
          this.datosSituacionLaboral[index].columnas!['columna5'],
        '¿Qué tipo de contrato tiene con la empresa donde trabaja?':
          this.datosSituacionLaboral[index].columnas!['columna6'],
        '¿Cuál es la naturaleza de su actividad económica?':
          this.datosSituacionLaboral[index].columnas!['columna7'],
        '¿Qué tan relacionado está su empleo con la carrera que estudió?':
          this.datosSituacionLaboral[index].columnas!['columna8'],
        '¿Cuál es su rango salarial?':
          this.datosSituacionLaboral[index].columnas!['columna9'],
        FECHA: this.datosSituacionLaboral[index].fecha,
      });
    }
  }

  datosSituacionLaboralExcel() {
    this.dataSituacionLaboral.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row));
    });
    let fecha = this.datePipe.transform(Date.now(), 'dd-MM-yyyy h:mm a');
    let reportData = {
      title: 'Reporte ' + fecha,
      data: this.dataForExcel,
      headers: Object.keys(this.dataSituacionLaboral[0]),
    };

    this.reporteSituacionLaboralExcelService.exportExcel(reportData);
  }
}
