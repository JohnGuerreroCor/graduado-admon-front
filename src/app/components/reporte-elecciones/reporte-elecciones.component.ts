import { ReporteGraduadosEleccionesExcelService } from './../../services/reporte-graduados-elecciones-excel.service';
import { PuestoVotacionService } from 'src/app/services/puesto-votacion.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GraduadoService } from 'src/app/services/graduado.service';
import { FotoService } from 'src/app/services/foto.service';
import { DatePipe } from '@angular/common';
import { ConsultaGeneralService } from '../../services/consulta-general.service';
import { GraduadosElecciones } from 'src/app/models/graduados-elecciones';

@Component({
  selector: 'app-reporte-elecciones',
  templateUrl: './reporte-elecciones.component.html',
  styleUrls: ['./reporte-elecciones.component.css'],
})
export class ReporteEleccionesComponent {
  dataForExcel: any[] = [];
  dataGraduadosElecciones: any[] = [];
  listadoGraduadosElecciones: GraduadosElecciones[] = [];
  noInformacion: boolean = false;
  precarga: boolean = true;
  buscador: boolean = false;

  dataSource = new MatTableDataSource<GraduadosElecciones>([]);
  displayedColumns: string[] = [
    'index',
    'sede',
    'dependencia',
    'nivelAcademico',
    'nivelFormacion',
    'programa',
    'tipoIdentificacion',
    'identificacion',
  ];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    public graduadoService: GraduadoService,
    public fotoService: FotoService,
    private datePipe: DatePipe,
    public consultaGeneralService: ConsultaGeneralService,
    public puestoVotacionService: PuestoVotacionService,
    public reporteGraduadosEleccionesExcelService: ReporteGraduadosEleccionesExcelService
  ) {
    this.noInformacion = true;
    this.precarga = false;
    this.puestoVotacionService
      .obtenerListadoGraduadosElecciones()
      .subscribe((data) => {
        if (JSON.stringify(data) == '[]') {
          this.noInformacion = false;
          this.precarga = true;
          this.buscador = false;
        } else {
          this.listadoGraduadosElecciones = data;
          this.buscador = true;
          this.dataSource = new MatTableDataSource<GraduadosElecciones>(data);
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
    for (
      let index = 0;
      index < this.listadoGraduadosElecciones.length;
      index++
    ) {
      this.dataGraduadosElecciones.push({
        N: index + 1,
        SEDE: this.listadoGraduadosElecciones[index].sede,
        FACULTAD: this.listadoGraduadosElecciones[index].facultad,
        'NIVEL ACADÉMICO':
          this.listadoGraduadosElecciones[index].nivelAcademico,
        'NIVEL FORMACIÓN':
          this.listadoGraduadosElecciones[index].nivelFormacion,
        PROGRAMA: this.listadoGraduadosElecciones[index].programa,
        'TIPO IDENTIFICACIÓN':
          this.listadoGraduadosElecciones[index].tipoIdentificacion,
        IDENTIFICACIÓN: this.listadoGraduadosElecciones[index].identificacion,
      });
    }
  }

  graduadosEleccionesExcel() {
    this.dataGraduadosElecciones.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row));
    });
    let fecha = this.datePipe.transform(Date.now(), 'dd-MM-yyyy h:mm a');
    let reportData = {
      title: 'Listados de graduados para el proceso electoral ' + fecha,
      data: this.dataForExcel,
      headers: Object.keys(this.dataGraduadosElecciones[0]),
    };

    this.reporteGraduadosEleccionesExcelService.exportExcel(reportData);
  }
}
