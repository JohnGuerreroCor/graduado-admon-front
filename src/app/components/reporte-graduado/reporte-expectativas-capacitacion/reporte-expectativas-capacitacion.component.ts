import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GraduadoService } from 'src/app/services/graduado.service';
import { FotoService } from 'src/app/services/foto.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import { ReporteSituacionLaboral } from 'src/app/models/reporte-situacion-laboral';
import { ReporteExpectativaCapacitacionExcelService } from 'src/app/services/reporte-expectativa-capacitacion-excel.service';
import { ExpectativaCapacitacionService } from 'src/app/services/expectativa-capacitacion.service';
import { ReporteExpectativaCapacitacion } from 'src/app/models/reporte-expectativa-capacitacion';

@Component({
  selector: 'app-reporte-expectativas-capacitacion',
  templateUrl: './reporte-expectativas-capacitacion.component.html',
  styleUrls: ['./reporte-expectativas-capacitacion.component.css'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
  ],
})
export class ReporteExpectativasCapacitacionComponent {
  datosExpectativaCapacitacion: ReporteExpectativaCapacitacion[] = [];
  fechaInicio!: Date;
  fechaFin!: Date;

  dataForExcel: any[] = [];
  dataExpectativaCapacitacion: any[] = [];

  noInformacion: boolean = false;
  precarga: boolean = true;
  buscador: boolean = false;

  dataSource = new MatTableDataSource<ReporteExpectativaCapacitacion>([]);
  displayedColumns: string[] = [
    'index',
    'graduado',
    'pregunta1',
    'pregunta2',
    'pregunta3',
    'fecha',
  ];
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

  constructor(
    public graduadoService: GraduadoService,
    public fotoService: FotoService,
    public ubicacionService: UbicacionService,
    public datosPersonalesService: DatosPersonalesService,
    public expectativaCapacitacionService: ExpectativaCapacitacionService,
    public reporteExpectativaCapacitacionExcelService: ReporteExpectativaCapacitacionExcelService,
    private datePipe: DatePipe
  ) {}

  obtenerReporte() {
    this.noInformacion = true;
    this.precarga = false;
    let inicio = this.datePipe.transform(this.fechaInicio, 'yyyy-MM-dd');
    let fin = this.datePipe.transform(this.fechaFin, 'yyyy-MM-dd');
    this.expectativaCapacitacionService
      .obtenerRerporteExpectativaCapacitacion(inicio, fin)
      .subscribe((data) => {
        if (JSON.stringify(data) == '[]') {
          this.noInformacion = false;
          this.precarga = true;
        } else {
          this.datosExpectativaCapacitacion = data;
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
    for (
      let index = 0;
      index < this.datosExpectativaCapacitacion.length;
      index++
    ) {
      this.dataExpectativaCapacitacion.push({
        N: index + 1,
        GRADUADO:
          this.datosExpectativaCapacitacion[index].personaNombre +
          ' ' +
          this.datosExpectativaCapacitacion[index].personaApellido,
        '¿Tiene interés en continuar su proceso de formación académica?':
          this.datosExpectativaCapacitacion[index].columnas!['columna0'],
        '¿A qué nivel de formación académica aspira?':
          this.datosExpectativaCapacitacion[index].columnas!['columna1'],
        ' ¿Puede indicar el área de conocimiento en la que desearía cursar estudios?':
          this.datosExpectativaCapacitacion[index].columnas!['columna2'],
        FECHA: this.datosExpectativaCapacitacion[index].fecha,
      });
    }
  }

  datosExpectativaCapacitacionExcel() {
    this.dataExpectativaCapacitacion.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row));
    });
    let reportData = {
      title: 'Reporte ',
      data: this.dataForExcel,
      headers: Object.keys(this.dataExpectativaCapacitacion[0]),
    };

    this.reporteExpectativaCapacitacionExcelService.exportExcel(reportData);
  }
}
