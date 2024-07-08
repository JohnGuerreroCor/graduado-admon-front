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
import { HistorialAcademico } from 'src/app/models/historial-academico';
import { ReporteHistorialAcademicoExcelService } from 'src/app/services/reporte-historial-academico-excel.service';
import { FormacionAcademicaService } from 'src/app/services/formacion-academica.service';

@Component({
  selector: 'app-reporte-formacion-academica',
  templateUrl: './reporte-formacion-academica.component.html',
  styleUrls: ['./reporte-formacion-academica.component.css'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
  ],
})
export class ReporteFormacionAcademicaComponent {
  datosHistorialAcademico: HistorialAcademico[] = [];
  fechaInicio!: Date;
  fechaFin!: Date;

  dataForExcel: any[] = [];
  dataHistorialAcademico: any[] = [];

  noInformacion: boolean = false;
  precarga: boolean = true;
  buscador: boolean = false;

  dataSource = new MatTableDataSource<HistorialAcademico>([]);
  displayedColumns: string[] = [
    'index',
    'graduado',
    'nivel',
    'institucion',
    'titulo',
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
    public formacionAcademicaService: FormacionAcademicaService,
    public reporteHistorialAcademicoExcelService: ReporteHistorialAcademicoExcelService,
    private datePipe: DatePipe
  ) {}

  obtenerReporte() {
    this.noInformacion = true;
    this.precarga = false;
    let inicio = this.datePipe.transform(this.fechaInicio, 'yyyy-MM-dd');
    let fin = this.datePipe.transform(this.fechaFin, 'yyyy-MM-dd');
    this.formacionAcademicaService
      .obtenerReporteHistorialAcademico(inicio, fin)
      .subscribe((data) => {
        if (JSON.stringify(data) == '[]') {
          this.noInformacion = false;
          this.precarga = true;
        } else {
          this.datosHistorialAcademico = data;
          this.precarga = true;
          this.dataSource = new MatTableDataSource<HistorialAcademico>(data);
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
    for (let index = 0; index < this.datosHistorialAcademico.length; index++) {
      this.dataHistorialAcademico.push({
        N: index + 1,
        GRADUADO:
          this.datosHistorialAcademico[index].personaNombre +
          ' ' +
          this.datosHistorialAcademico[index].personaApellido,
        'NIVEL DE FORMACIÓN':
          this.datosHistorialAcademico[index].nivelAcademico,
        INSTITUCIÓN: this.datosHistorialAcademico[index].institucion,
        'TÍTULO OBTENIDO': this.datosHistorialAcademico[index].titulo,
        FECHA: this.datePipe.transform(
          this.datosHistorialAcademico[index].fechaFin,
          'dd/MM/yyyy'
        ),
      });
    }
  }

  datosHistorialAcademicoExcel() {
    this.dataHistorialAcademico.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row));
    });
    let reportData = {
      title: 'Reporte ',
      data: this.dataForExcel,
      headers: Object.keys(this.dataHistorialAcademico[0]),
    };

    this.reporteHistorialAcademicoExcelService.exportExcel(reportData);
  }
}
