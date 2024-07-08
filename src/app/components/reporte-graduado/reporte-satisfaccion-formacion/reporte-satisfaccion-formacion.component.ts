import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { GraduadoService } from 'src/app/services/graduado.service';
import { FotoService } from 'src/app/services/foto.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { SatisfaccionFormacionService } from 'src/app/services/satisfaccion-formacion.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ReporteCompetencia } from 'src/app/models/reporte-competencia';
import { DatePipe } from '@angular/common';
import { ReporteCompetenciasExcelService } from 'src/app/services/reporte-competencias-excel.service';

@Component({
  selector: 'app-reporte-satisfaccion-formacion',
  templateUrl: './reporte-satisfaccion-formacion.component.html',
  styleUrls: ['./reporte-satisfaccion-formacion.component.css'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
  ],
})
export class ReporteSatisfaccionFormacionComponent {
  preguntas = [
    '1). Crear, investigar y adoptar tecnología.',
    '2). Identificar, plantear y resolver problemas.',
    '3). Comprender la realidad que lo rodea.',
    '4). Asumir una cultura de convivencia.',
    '5). Asumir responsabilidades y tomar decisiones.',
    '6). Planificar y utilizar el tiempo de manera efectiva para lograr los objetivos planteados.',
    '7). Formular y ejecutar proyectos.',
    '8). Trabajar en equipo para alcanzar metas comunes.',
    '9). Aplicar valores y ética profesional en el desempeño laboral.',
    '10). Trabajar bajo presión.',
    '11). Exponer las ideas por medios escritos.',
    '12). Comunicar oralmente con claridad.',
    '13). Persuadir y convencer a sus interlocutores.',
    '14). Aceptar las diferencias y trabajar en contextos multiculturales.',
    '15). Aprender y mantenerse actualizado.',
    '16). Ser creativo e innovador.',
    '17). Buscar, analizar, administrar y compartir información.',
    '18). Identificar y utilizar símbolos para comunicarse (lenguaje icónico, lenguaje no verbal, etc).',
    '19). Capacidad de abstracción, análisis y síntesis.',
    '20). Utilizar herramientas informáticas especializadas (paquetes estadísticos, software de diseño, etc).',
    '21). Trabajar de manera independiente sin supervisión permanente.',
    '22). Utilizar herramientas informáticas básicas (procesadores de texto, hojas de cálculo, correo electrónico, etc).',
    '23). Diseñar e implementar soluciones con el apoyo de tecnología.',
    '24). Adaptarse a los cambios y trabajar en contextos nuevos y diversos.',
    '25). De acuerdo con la contribución de la institución que lo formó, ¿cuál de las competencias considera la más fuerte?',
    '26). De acuerdo con la contribución de la institución que lo formó, ¿cuál de las competencias considera la más débil?',
    '27). ¿Cuál de las competencias considera que ha sido la más útil en su trayectoria laboral?',
    '28). ¿Cuál de las competencias considera que ha sido la menos útil en su trayectoria laboral?',
  ];
  datosCompetencias: ReporteCompetencia[] = [];
  fechaInicio!: Date;
  fechaFin!: Date;

  dataForExcel: any[] = [];
  dataCompetencia: any[] = [];

  noInformacion: boolean = false;
  precarga: boolean = true;
  buscador: boolean = false;

  dataSource = new MatTableDataSource<ReporteCompetencia>([]);
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
    'pregunta11',
    'pregunta12',
    'pregunta13',
    'pregunta14',
    'pregunta15',
    'pregunta16',
    'pregunta17',
    'pregunta18',
    'pregunta19',
    'pregunta20',
    'pregunta21',
    'pregunta22',
    'pregunta23',
    'pregunta24',
    'pregunta25',
    'pregunta26',
    'pregunta27',
    'pregunta28',
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
    public satisfaccionFormacionService: SatisfaccionFormacionService,
    public reporteCompetenciasExcelService: ReporteCompetenciasExcelService,
    private datePipe: DatePipe
  ) {}

  obtenerReporte() {
    this.noInformacion = true;
    this.precarga = false;
    let inicio = this.datePipe.transform(this.fechaInicio, 'yyyy-MM-dd');
    let fin = this.datePipe.transform(this.fechaFin, 'yyyy-MM-dd');
    this.satisfaccionFormacionService
      .obtenerRerporteCompetencia(inicio, fin)
      .subscribe((data) => {
        if (JSON.stringify(data) == '[]') {
          this.noInformacion = false;
          this.precarga = true;
        } else {
          this.datosCompetencias = data;
          this.precarga = true;
          this.dataSource = new MatTableDataSource<ReporteCompetencia>(data);
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
    for (let index = 0; index < this.datosCompetencias.length; index++) {
      this.dataCompetencia.push({
        N: index + 1,
        GRADUADO:
          this.datosCompetencias[index].personaNombre +
          ' ' +
          this.datosCompetencias[index].personaApellido,
        '1). Crear, investigar y adoptar tecnología.':
          this.datosCompetencias[index].columnas!['columna0'],
        '2). Identificar, plantear y resolver problemas.':
          this.datosCompetencias[index].columnas!['columna1'],
        '3). Comprender la realidad que lo rodea.':
          this.datosCompetencias[index].columnas!['columna2'],
        '4). Asumir una cultura de convivencia.':
          this.datosCompetencias[index].columnas!['columna3'],
        '5). Asumir responsabilidades y tomar decisiones.':
          this.datosCompetencias[index].columnas!['columna4'],
        '6). Planificar y utilizar el tiempo de manera efectiva para lograr los objetivos planteados.':
          this.datosCompetencias[index].columnas!['columna5'],
        '7). Formular y ejecutar proyectos.':
          this.datosCompetencias[index].columnas!['columna6'],
        '8). Trabajar en equipo para alcanzar metas comunes.':
          this.datosCompetencias[index].columnas!['columna7'],
        '9). Aplicar valores y ética profesional en el desempeño laboral.':
          this.datosCompetencias[index].columnas!['columna8'],
        '10). Trabajar bajo presión.':
          this.datosCompetencias[index].columnas!['columna9'],
        '11). Exponer las ideas por medios escritos.':
          this.datosCompetencias[index].columnas!['columna10'],
        '12). Comunicar oralmente con claridad.':
          this.datosCompetencias[index].columnas!['columna11'],
        '13). Persuadir y convencer a sus interlocutores.':
          this.datosCompetencias[index].columnas!['columna12'],
        '14). Aceptar las diferencias y trabajar en contextos multiculturales.':
          this.datosCompetencias[index].columnas!['columna13'],
        '15). Aprender y mantenerse actualizado.':
          this.datosCompetencias[index].columnas!['columna14'],
        '16). Ser creativo e innovador.':
          this.datosCompetencias[index].columnas!['columna15'],
        '17). Buscar, analizar, administrar y compartir información.':
          this.datosCompetencias[index].columnas!['columna16'],
        '18). Identificar y utilizar símbolos para comunicarse (lenguaje icónico, lenguaje no verbal, etc).':
          this.datosCompetencias[index].columnas!['columna17'],
        '19). Capacidad de abstracción, análisis y síntesis.':
          this.datosCompetencias[index].columnas!['columna18'],
        '20). Utilizar herramientas informáticas especializadas (paquetes estadísticos, software de diseño, etc).':
          this.datosCompetencias[index].columnas!['columna19'],
        '21). Trabajar de manera independiente sin supervisión permanente.':
          this.datosCompetencias[index].columnas!['columna20'],
        '22). Utilizar herramientas informáticas básicas (procesadores de texto, hojas de cálculo, correo electrónico, etc).':
          this.datosCompetencias[index].columnas!['columna21'],
        '23). Diseñar e implementar soluciones con el apoyo de tecnología.':
          this.datosCompetencias[index].columnas!['columna22'],
        '24). Adaptarse a los cambios y trabajar en contextos nuevos y diversos.':
          this.datosCompetencias[index].columnas!['columna23'],
        '25). De acuerdo con la contribución de la institución que lo formó, ¿cuál de las competencias considera la más fuerte?':
          this.datosCompetencias[index].columnas!['columna24'],
        '26). De acuerdo con la contribución de la institución que lo formó, ¿cuál de las competencias considera la más débil?':
          this.datosCompetencias[index].columnas!['columna25'],
        '27). ¿Cuál de las competencias considera que ha sido la más útil en su trayectoria laboral?':
          this.datosCompetencias[index].columnas!['columna26'],
        '28). ¿Cuál de las competencias considera que ha sido la menos útil en su trayectoria laboral?':
          this.datosCompetencias[index].columnas!['columna27'],
        FECHA: this.datosCompetencias[index].fecha,
      });
    }
  }

  datosCompetenciasExcel() {
    this.dataCompetencia.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row));
    });
    let fecha = this.datePipe.transform(Date.now(), 'dd-MM-yyyy h:mm a');
    let reportData = {
      title: 'Reporte ' + fecha,
      data: this.dataForExcel,
      headers: Object.keys(this.dataCompetencia[0]),
    };

    this.reporteCompetenciasExcelService.exportExcel(reportData);
  }
}
