import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GraduadoService } from 'src/app/services/graduado.service';
import { FotoService } from 'src/app/services/foto.service';
import { DatePipe } from '@angular/common';
import { DatosComplementarios } from '../../../models/datos-complementarios';
import { InformacionAcademicaService } from 'src/app/services/informacion-academica.service';
import { ReporteEgresadoPerfilProfesionalExcelService } from 'src/app/services/reporte-egresado-perfil-profesional-excel.service';

@Component({
  selector: 'app-reporte-perfil-profesional',
  templateUrl: './reporte-perfil-profesional.component.html',
  styleUrls: ['./reporte-perfil-profesional.component.css'],
})
export class ReportePerfilProfesionalComponent {
  datosComplementarios: DatosComplementarios[] = [];
  fechaInicio!: Date;
  fechaFin!: Date;

  dataForExcel: any[] = [];
  dataNorma: any[] = [];

  noInformacion: boolean = false;
  precarga: boolean = true;
  buscador: boolean = false;

  dataSource = new MatTableDataSource<DatosComplementarios>([]);
  displayedColumns: string[] = [
    'index',
    'codigo',
    'nombre',
    'programa',
    'modalidad',
    'perfil',
  ];
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public graduadoService: GraduadoService,
    public fotoService: FotoService,
    public informacionAcademicaService: InformacionAcademicaService,
    public reporteEgresadoPerfilProfesionalExcelService: ReporteEgresadoPerfilProfesionalExcelService,
    private datePipe: DatePipe
  ) {}

  obtenerReporte() {
    this.noInformacion = true;
    this.precarga = false;
    let inicio = this.datePipe.transform(this.fechaInicio, 'yyyy-MM-dd');
    let fin = this.datePipe.transform(this.fechaFin, 'yyyy-MM-dd');
    this.informacionAcademicaService
      .obtenerReporteDatosComplementarios(inicio, fin)
      .subscribe((data) => {
        if (JSON.stringify(data) == '[]') {
          this.noInformacion = false;
          this.precarga = true;
        } else {
          this.datosComplementarios = data;
          this.precarga = true;
          this.dataSource = new MatTableDataSource<DatosComplementarios>(data);
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
    for (let index = 0; index < this.datosComplementarios.length; index++) {
      this.dataNorma.push({
        N: index + 1,
        CÓDIGO: this.datosComplementarios[index].estudianteCodigo,
        EGRESADO:
          this.datosComplementarios[index].nombre +
          ' ' +
          this.datosComplementarios[index].apellido,
        PROGRAMA: this.datosComplementarios[index].programa,
        MODALIDAD: this.datosComplementarios[index].modalidad,
        'PERFIL PROFESIONAL':
          this.datosComplementarios[index].perfilProfesional,
      });
    }
  }

  datosComplementariosExcel() {
    this.dataNorma.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row));
    });
    let fecha = this.datePipe.transform(Date.now(), 'dd-MM-yyyy h:mm a');
    let reportData = {
      title: 'Reporte ' + fecha,
      data: this.dataForExcel,
      headers: Object.keys(this.dataNorma[0]),
    };

    this.reporteEgresadoPerfilProfesionalExcelService.exportExcel(reportData);
  }
}
