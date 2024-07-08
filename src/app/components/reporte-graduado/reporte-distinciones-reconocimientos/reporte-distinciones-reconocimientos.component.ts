import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GraduadoService } from 'src/app/services/graduado.service';
import { FotoService } from 'src/app/services/foto.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import { MencionReconocimiento } from 'src/app/models/mencion-reconocimiento';
import { MencionReconocimientoService } from 'src/app/services/mencion-reconocimiento.service';
import { ReporteDistincionesReconocimientoExcelService } from 'src/app/services/reporte-distinciones-reconocimiento-excel.service';

@Component({
  selector: 'app-reporte-distinciones-reconocimientos',
  templateUrl: './reporte-distinciones-reconocimientos.component.html',
  styleUrls: ['./reporte-distinciones-reconocimientos.component.css'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
  ],
})
export class ReporteDistincionesReconocimientosComponent {
  datosMencionReconocimiento: MencionReconocimiento[] = [];
  fechaInicio!: Date;
  fechaFin!: Date;

  dataForExcel: any[] = [];
  dataMencionReconocimiento: any[] = [];

  noInformacion: boolean = false;
  precarga: boolean = true;
  buscador: boolean = false;

  dataSource = new MatTableDataSource<MencionReconocimiento>([]);
  displayedColumns: string[] = [
    'index',
    'graduado',
    'ambito',
    'institucion',
    'titulo',
    'municipio',
    'fecha',
  ];
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

  constructor(
    public graduadoService: GraduadoService,
    public fotoService: FotoService,
    public ubicacionService: UbicacionService,
    public datosPersonalesService: DatosPersonalesService,
    public mencionReconocimientoService: MencionReconocimientoService,
    public reporteDistincionesReconocimientoExcelService: ReporteDistincionesReconocimientoExcelService,
    private datePipe: DatePipe
  ) {}

  obtenerReporte() {
    this.noInformacion = true;
    this.precarga = false;
    let inicio = this.datePipe.transform(this.fechaInicio, 'yyyy-MM-dd');
    let fin = this.datePipe.transform(this.fechaFin, 'yyyy-MM-dd');
    this.mencionReconocimientoService
      .obtenerReporteMencionesReconocimiento(inicio, fin)
      .subscribe((data) => {
        if (JSON.stringify(data) == '[]') {
          this.noInformacion = false;
          this.precarga = true;
        } else {
          this.datosMencionReconocimiento = data;
          this.precarga = true;
          this.dataSource = new MatTableDataSource<MencionReconocimiento>(data);
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
      index < this.datosMencionReconocimiento.length;
      index++
    ) {
      this.dataMencionReconocimiento.push({
        N: index + 1,
        GRADUADO:
          this.datosMencionReconocimiento[index].personaNombre +
          ' ' +
          this.datosMencionReconocimiento[index].personaApellido,
        ÁMBITO: this.datosMencionReconocimiento[index].ambito,
        INSTITUCIÓN: this.datosMencionReconocimiento[index].institucion,
        MUNICIPIO: this.datosMencionReconocimiento[index].municipio,
        FECHA: this.datosMencionReconocimiento[index].fecha,
      });
    }
  }

  datosMencionReconocimientoExcel() {
    this.dataMencionReconocimiento.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row));
    });
    let reportData = {
      title: 'Reporte ',
      data: this.dataForExcel,
      headers: Object.keys(this.dataMencionReconocimiento[0]),
    };

    this.reporteDistincionesReconocimientoExcelService.exportExcel(reportData);
  }
}
