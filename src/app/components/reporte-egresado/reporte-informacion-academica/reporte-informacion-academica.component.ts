import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GraduadoService } from 'src/app/services/graduado.service';
import { FotoService } from 'src/app/services/foto.service';
import { DatePipe } from '@angular/common';
import { HabilidadInformatica } from 'src/app/models/habilidad-informatica';
import { InformacionAcademicaService } from 'src/app/services/informacion-academica.service';
import { Idioma } from 'src/app/models/idioma';
import { RegistroEducativo } from 'src/app/models/registro-educativo';
import { ReporteEgresadoEstudioRealizadoExcelService } from 'src/app/services/reporte-egresado-estudio-realizado-excel.service';
import { ReporteEgresadoIdiomaExcelService } from 'src/app/services/reporte-egresado-idioma-excel.service';
import { ReporteEgresadoHabilidadesInformaticasExcelService } from 'src/app/services/reporte-egresado-habilidades-informaticas-excel.service';

@Component({
  selector: 'app-reporte-informacion-academica',
  templateUrl: './reporte-informacion-academica.component.html',
  styleUrls: ['./reporte-informacion-academica.component.css'],
})
export class ReporteInformacionAcademicaComponent {
  fechaInicioAcademico!: Date;
  fechaFinAcademico!: Date;
  fechaInicioIdioma!: Date;
  fechaFinIdioma!: Date;
  fechaInicioInformatica!: Date;
  fechaFinInformatica!: Date;

  dataRegistroEducativo: any[] = [];
  dataIdioma: any[] = [];
  dataHabilidadInformatica: any[] = [];

  dataForExcelRegistroEducativo: any[] = [];
  dataForExcelIdioma: any[] = [];
  dataForExcelHabilidadInformatica: any[] = [];

  listadoRegistroEducativo: RegistroEducativo[] = [];
  listadoIdioma: Idioma[] = [];
  listadoHabilidadInformatica: HabilidadInformatica[] = [];

  noInformacionAcademico: boolean = false;
  precargaAcademico: boolean = true;

  noInformacionIdioma: boolean = false;
  precargaIdioma: boolean = true;

  noInformacionInformatica: boolean = false;
  precargaInformatica: boolean = true;

  dataSourceRegistroEducativo = new MatTableDataSource<RegistroEducativo>([]);
  displayedColumnsRegistroEducativo: string[] = [
    'index',
    'nombre',
    'estudio',
    'nivel',
    'titulo',
    'entidad',
    'fecha',
  ];
  @ViewChild('MatPaginatorRegistroEducativo', { static: false })
  paginatorRegistroEducativo!: MatPaginator;

  dataSourceHabilidadInformatica = new MatTableDataSource<HabilidadInformatica>(
    []
  );
  displayedColumnsHabilidadInformatica: string[] = [
    'index',
    'nombre',
    'programa',
    'dominio',
  ];
  @ViewChild('MatPaginatorHabilidadInformatica', { static: false })
  paginatorHabilidadInformatica!: MatPaginator;

  dataSourceIdioma = new MatTableDataSource<Idioma>([]);
  displayedColumnsIdioma: string[] = [
    'index',
    'nombre',
    'idioma',
    'conversacion',
    'escritura',
    'lectura',
  ];
  @ViewChild('MatPaginatorIdioma', { static: false })
  paginatorIdioma!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortIdioma!: MatSort;

  constructor(
    public dialog: MatDialog,
    public graduadoService: GraduadoService,
    public fotoService: FotoService,
    public informacionAcademicaService: InformacionAcademicaService,
    public reporteEgresadoEstudioRealizadoExcelService: ReporteEgresadoEstudioRealizadoExcelService,
    public reporteEgresadoIdiomaExcelService: ReporteEgresadoIdiomaExcelService,
    public reporteEgresadoHabilidadesInformaticasExcelService: ReporteEgresadoHabilidadesInformaticasExcelService,
    private datePipe: DatePipe
  ) {}

  crearDatasourceRegistroEducativo() {
    for (let index = 0; index < this.listadoRegistroEducativo.length; index++) {
      if (this.listadoRegistroEducativo[index].finalizado == 1) {
        this.dataRegistroEducativo.push({
          N: index + 1,
          EGRESADO:
            this.listadoRegistroEducativo[index].personaNombre +
            ' ' +
            this.listadoRegistroEducativo[index].personaApellido,
          'ESTUDIO REALIZADO': this.listadoRegistroEducativo[index].titulo,
          'NIVEL ACADÉMICO':
            this.listadoRegistroEducativo[index].nivelAcademico,
          'TÍTULO OBTENIDO': 'SI',
          ENTIDAD: this.listadoRegistroEducativo[index].institucion,
          'FECHA DE FINALIZACIÓN':
            this.listadoRegistroEducativo[index].fechaFin,
        });
      } else {
        this.dataRegistroEducativo.push({
          N: index + 1,
          EGRESADO:
            this.listadoRegistroEducativo[index].personaNombre +
            ' ' +
            this.listadoRegistroEducativo[index].personaApellido,
          'ESTUDIO REALIZADO': this.listadoRegistroEducativo[index].titulo,
          'NIVEL ACADÉMICO':
            this.listadoRegistroEducativo[index].nivelAcademico,
          'TÍTULO OBTENIDO': 'NO',
          ENTIDAD: this.listadoRegistroEducativo[index].institucion,
          'FECHA DE FINALIZACIÓN':
            this.listadoRegistroEducativo[index].fechaFin,
        });
      }
    }
  }

  crearDatasourceIdioma() {
    for (let index = 0; index < this.listadoIdioma.length; index++) {
      this.dataIdioma.push({
        N: index + 1,
        EGRESADO:
          this.listadoIdioma[index].personaNombre +
          ' ' +
          this.listadoIdioma[index].personaApellido,
        IDIOMA: this.listadoIdioma[index].nombre,
        CONVERSACIÓN: this.listadoIdioma[index].conversacion,
        ESCRITURA: this.listadoIdioma[index].escritura,
        LECTURA: this.listadoIdioma[index].lectura,
      });
    }
  }

  crearDatasourceHabilidadInformatica() {
    for (
      let index = 0;
      index < this.listadoHabilidadInformatica.length;
      index++
    ) {
      this.dataHabilidadInformatica.push({
        N: index + 1,
        EGRESADO:
          this.listadoHabilidadInformatica[index].personaNombre +
          ' ' +
          this.listadoHabilidadInformatica[index].personaApellido,
        'PROGRAMA INFORMÁTICO':
          this.listadoHabilidadInformatica[index].nombrePrograma,
        DOMINIO: this.listadoHabilidadInformatica[index].dominio,
      });
    }
  }

  obtenerReporteRegistroEducativo() {
    this.noInformacionAcademico = true;
    this.precargaAcademico = false;
    let inicio = this.datePipe.transform(
      this.fechaInicioAcademico,
      'yyyy-MM-dd'
    );
    let fin = this.datePipe.transform(this.fechaFinAcademico, 'yyyy-MM-dd');
    this.informacionAcademicaService
      .obtenerReporteRegistroEducativo(inicio, fin)
      .subscribe((data) => {
        if (JSON.stringify(data) == '[]') {
          this.noInformacionAcademico = false;
          this.precargaAcademico = true;
        } else {
          this.precargaAcademico = true;
          this.listadoRegistroEducativo = data;
          this.dataSourceRegistroEducativo =
            new MatTableDataSource<RegistroEducativo>(data);
          this.paginatorRegistroEducativo.firstPage();
          this.dataSourceRegistroEducativo.paginator =
            this.paginatorRegistroEducativo;
          this.crearDatasourceRegistroEducativo();
        }
      });
  }

  filtrarRegistroEducativo(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceRegistroEducativo.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceRegistroEducativo.paginator) {
      this.dataSourceRegistroEducativo.paginator.firstPage();
    }
  }

  exportToExcelRegistroEducativo() {
    this.dataRegistroEducativo.forEach((row: any) => {
      this.dataForExcelRegistroEducativo.push(Object.values(row));
    });
    let fecha = this.datePipe.transform(Date.now(), 'dd-MM-yyyy h:mm a');
    let reportData = {
      title: 'Reporte Registro Educativo Egresados ' + fecha,
      data: this.dataForExcelRegistroEducativo,
      headers: Object.keys(this.dataRegistroEducativo[0]),
    };

    this.reporteEgresadoEstudioRealizadoExcelService.exportExcel(reportData);
  }

  obtenerReporteIdiomas() {
    this.noInformacionIdioma = true;
    this.precargaIdioma = false;
    let inicio = this.datePipe.transform(this.fechaInicioIdioma, 'yyyy-MM-dd');
    let fin = this.datePipe.transform(this.fechaFinIdioma, 'yyyy-MM-dd');
    this.informacionAcademicaService
      .obtenerReporteIdiomas(inicio, fin)
      .subscribe((data) => {
        if (JSON.stringify(data) == '[]') {
          this.noInformacionIdioma = false;
          this.precargaIdioma = true;
        } else {
          this.precargaIdioma = true;
          this.listadoIdioma = data;
          this.dataSourceIdioma = new MatTableDataSource<Idioma>(data);
          this.paginatorIdioma.firstPage();
          this.dataSourceIdioma.paginator = this.paginatorIdioma;
          this.crearDatasourceIdioma();
        }
      });
  }

  filtrarIdiomas(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceIdioma.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceIdioma.paginator) {
      this.dataSourceIdioma.paginator.firstPage();
    }
  }

  exportToExcelIdioma() {
    this.dataIdioma.forEach((row: any) => {
      this.dataForExcelIdioma.push(Object.values(row));
    });
    let fecha = this.datePipe.transform(Date.now(), 'dd-MM-yyyy h:mm a');
    let reportData = {
      title: 'Reporte Idiomas Egresados ' + fecha,
      data: this.dataForExcelIdioma,
      headers: Object.keys(this.dataIdioma[0]),
    };
    console.log(this.dataForExcelIdioma[0]);

    this.reporteEgresadoIdiomaExcelService.exportExcel(reportData);
  }

  obtenerReporteHabilidadesInformaticas() {
    this.noInformacionInformatica = true;
    this.precargaInformatica = false;
    let inicio = this.datePipe.transform(
      this.fechaInicioInformatica,
      'yyyy-MM-dd'
    );
    let fin = this.datePipe.transform(this.fechaFinInformatica, 'yyyy-MM-dd');
    this.informacionAcademicaService
      .obtenerReporteHabilidadesInformaticas(inicio, fin)
      .subscribe((data) => {
        if (JSON.stringify(data) == '[]') {
          this.noInformacionInformatica = false;
          this.precargaInformatica = true;
        } else {
          this.precargaInformatica = true;
          this.listadoHabilidadInformatica = data;
          this.dataSourceHabilidadInformatica =
            new MatTableDataSource<HabilidadInformatica>(data);
          this.paginatorHabilidadInformatica.firstPage();
          this.dataSourceHabilidadInformatica.paginator =
            this.paginatorHabilidadInformatica;
          this.crearDatasourceHabilidadInformatica();
        }
      });
  }

  filtrarHabilidadesInformaticas(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceHabilidadInformatica.filter = filterValue
      .trim()
      .toLowerCase();

    if (this.dataSourceHabilidadInformatica.paginator) {
      this.dataSourceHabilidadInformatica.paginator.firstPage();
    }
  }

  exportToExcelHabilidadInformatica() {
    this.dataHabilidadInformatica.forEach((row: any) => {
      this.dataForExcelHabilidadInformatica.push(Object.values(row));
    });
    let fecha = this.datePipe.transform(Date.now(), 'dd-MM-yyyy h:mm a');
    let reportData = {
      title: 'Reporte Habilidades Informáticas Egresados ' + fecha,
      data: this.dataForExcelHabilidadInformatica,
      headers: Object.keys(this.dataHabilidadInformatica[0]),
    };

    this.reporteEgresadoHabilidadesInformaticasExcelService.exportExcel(
      reportData
    );
  }
}
