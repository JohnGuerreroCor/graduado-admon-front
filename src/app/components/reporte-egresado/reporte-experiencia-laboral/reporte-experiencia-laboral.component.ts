import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GraduadoService } from 'src/app/services/graduado.service';
import { FotoService } from 'src/app/services/foto.service';
import { DatePipe } from '@angular/common';
import { HistorialLaboralService } from '../../../services/historial-laboral.service';
import { HistorialLaboral } from 'src/app/models/historial-laboral';
import { ReporteEgresadoHistorialLaboralExcelService } from 'src/app/services/reporte-egresado-historial-laboral-excel.service';

@Component({
  selector: 'app-reporte-experiencia-laboral',
  templateUrl: './reporte-experiencia-laboral.component.html',
  styleUrls: ['./reporte-experiencia-laboral.component.css'],
})
export class ReporteExperienciaLaboralComponent {
  listadoHistorialLaboral: HistorialLaboral[] = [];
  fechaInicio!: Date;
  fechaFin!: Date;

  dataForExcel: any[] = [];
  dataNorma: any[] = [];

  noInformacion: boolean = false;
  precarga: boolean = true;

  dataSourceHistorialLaboral = new MatTableDataSource<HistorialLaboral>([]);
  displayedColumnsHistorialLaboral: string[] = [
    'index',
    'nombre',
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
    public graduadoService: GraduadoService,
    public fotoService: FotoService,
    public historialLaboralService: HistorialLaboralService,
    public reporteEgresadoHistorialLaboralExcelService: ReporteEgresadoHistorialLaboralExcelService,
    private datePipe: DatePipe
  ) {}

  obtenerReporte() {
    this.noInformacion = true;
    this.precarga = false;
    let inicio = this.datePipe.transform(this.fechaInicio, 'yyyy-MM-dd');
    let fin = this.datePipe.transform(this.fechaFin, 'yyyy-MM-dd');
    this.historialLaboralService
      .obtenerReporteHistorialLaboral(inicio, fin)
      .subscribe((data) => {
        if (JSON.stringify(data) == '[]') {
          this.noInformacion = false;
          this.precarga = true;
        } else {
          this.listadoHistorialLaboral = data;
          this.precarga = true;
          this.dataSourceHistorialLaboral =
            new MatTableDataSource<HistorialLaboral>(data);
          this.paginatorHistorialLaboral.firstPage();
          this.dataSourceHistorialLaboral.paginator =
            this.paginatorHistorialLaboral;
          this.crearDatasource();
        }
      });
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceHistorialLaboral.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceHistorialLaboral.paginator) {
      this.dataSourceHistorialLaboral.paginator.firstPage();
    }
  }

  crearDatasource() {
    for (let index = 0; index < this.listadoHistorialLaboral.length; index++) {
      this.dataNorma.push({
        N: index + 1,
        EGRESADO:
          this.listadoHistorialLaboral[index].nombre +
          ' ' +
          this.listadoHistorialLaboral[index].apellido,
        CARGO: this.listadoHistorialLaboral[index].cargo,
        FUNCIÓN: this.listadoHistorialLaboral[index].funcion,
        EMPRESA: this.listadoHistorialLaboral[index].empresa,
        'FECHA INICIO': this.listadoHistorialLaboral[index].fechaInicio,
        'FECHA FIN': this.listadoHistorialLaboral[index].fechaFin,
      });
    }
  }

  historialLaboralExcel() {
    this.dataNorma.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row));
    });
    let fecha = this.datePipe.transform(Date.now(), 'dd-MM-yyyy h:mm a');
    let reportData = {
      title: 'Reporte Egresados Experiencia Laboral ' + fecha,
      data: this.dataForExcel,
      headers: Object.keys(this.dataNorma[0]),
    };

    this.reporteEgresadoHistorialLaboralExcelService.exportExcel(reportData);
  }
}
