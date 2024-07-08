import { Component, ViewChild, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Graduado } from 'src/app/models/graduado';
import { GraduadoService } from 'src/app/services/graduado.service';
import { FotoService } from 'src/app/services/foto.service';
import { NivelAcademico } from 'src/app/models/nivel-academico';
import { HistorialAcademico } from 'src/app/models/historial-academico';
import { FormacionAcademicaService } from 'src/app/services/formacion-academica.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formacion-academica',
  templateUrl: './formacion-academica.component.html',
  styleUrls: ['./formacion-academica.component.css'],
})
export class FormacionAcademicaComponent {
  graduado: Graduado[] = [];
  identificacion: string = '';
  estudianteActivo: boolean = false;
  listadoNivelAacademico: NivelAcademico[] = [];
  listadoHistorialAcademico: HistorialAcademico[] = [];

  dataSource = new MatTableDataSource<Graduado>([]);
  displayedColumns: string[] = [
    'index',
    'codigo',
    'programa',
    'nivelAcademico',
    'sede',
    'fechaGrado',
  ];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  dataSourceHistorialAcademico = new MatTableDataSource<HistorialAcademico>([]);
  displayedColumnsHistorialAcademico: string[] = [
    'index',
    'titulo',
    'nivelAcademico',
    'institucion',
    'fechaGrado',
  ];
  @ViewChild(MatPaginator, { static: false }) paginatorHistorialAcademico!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    public graduadoService: GraduadoService,
    public fotoService: FotoService,
    public formacionAcademicaService: FormacionAcademicaService,
    private datePipe: DatePipe
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.identificacion = params['id'];
      this.graduado = [];
      this.dataSource = new MatTableDataSource<Graduado>([]);
      this.buscarGraduado(this.identificacion);
    });
    this.obtenerNivelAcademico();
  }

  obtenerNivelAcademico() {
    this.formacionAcademicaService
      .obtenerHistorialAcademico(this.identificacion)
      .subscribe((data) => {
        this.listadoHistorialAcademico = data;
        this.dataSourceHistorialAcademico = new MatTableDataSource<HistorialAcademico>(data);
        this.paginatorHistorialAcademico.firstPage();
        this.dataSourceHistorialAcademico.paginator = this.paginatorHistorialAcademico;
        console.log(this.listadoHistorialAcademico);
      });
  }

  buscarGraduado(id: string) {
    console.log(JSON.stringify(this.identificacion));
    if (this.identificacion !== '') {
      this.graduadoService.obtenerGraduado(id).subscribe((data) => {
        if (JSON.stringify(data) !== '[]') {
          this.graduado = data;
          this.graduadoService
            .obtenerGraduadoEstudianteActivo(this.graduado[0].persona.codigo)
            .subscribe((data) => {
              if (JSON.stringify(data) !== '[]') {
                Swal.fire({
                  icon: 'warning',
                  title: 'Graduado como estudiante activo.',
                  text: 'El graduado se encuentra estudiando actualmente una carrera en la universidad',
                  showConfirmButton: true,
                  confirmButtonColor: '#8f141b',
                });
                this.estudianteActivo = false;
              } else {
                this.estudianteActivo = true;
              }
            });
          this.dataSource = new MatTableDataSource<Graduado>(data);
          this.paginator.firstPage();
          this.dataSource.paginator = this.paginator;
        } else {
          this.graduado = [];
          Swal.fire({
            icon: 'warning',
            title: 'No existe',
            text: 'La cédula digitada no encontró ningún Graduado asociado, por favor rectifique el documento.',
            showConfirmButton: true,
            confirmButtonText: 'Listo',
            confirmButtonColor: '#8f141b',
          });
        }
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalEstudio, { width: '60%' });
  }
}

//// MODAL

@Component({
  selector: 'modal-estudio',
  templateUrl: 'modal-estudio.html',
  styleUrls: ['./formacion-academica.component.css'],
})
export class ModalEstudio {
  constructor(
    public dialogRef: MatDialogRef<ModalEstudio>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
