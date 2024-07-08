import { Component, ViewChild, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Graduado } from 'src/app/models/graduado';
import { GraduadoService } from 'src/app/services/graduado.service';
import { FotoService } from 'src/app/services/foto.service';
import { FotoAntigua } from 'src/app/models/foto-antigua';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-graduado',
  templateUrl: './graduado.component.html',
  styleUrls: ['./graduado.component.css'],
})
export class GraduadoComponent implements OnInit {
  graduado: Graduado[] = [];
  identificacion: string = '';
  estudianteActivo: boolean = false;

  formGraduado!: FormGroup;

  foto: FotoAntigua = {
    url: '',
  };

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

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public graduadoService: GraduadoService,
    public fotoService: FotoService,
    private datePipe: DatePipe
  ) {
    this.crearFormularioGraduado();
    this.graduadoService.id.subscribe((id) => {
      this.identificacion = id;
      this.graduado = [];
      this.foto.url = '';
      this.dataSource = new MatTableDataSource<Graduado>([]);
      this.buscarGraduado(this.identificacion);
    });
  }

  private crearFormularioGraduado(): void {
    this.formGraduado = this.formBuilder.group({
      codigo: new FormControl(''),
      tipoDocumento: new FormControl('', Validators.required),
      identificacion: new FormControl('', Validators.required),
      fechaExpedicion: new FormControl('', Validators.required),
      lugarExpedicion: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      telefonoFijo: new FormControl('', Validators.required),
      telefonoMovil: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  buscarGraduado(id: string) {
    if (this.identificacion !== '') {
      this.graduadoService.obtenerGraduado(id).subscribe((data) => {
        if (JSON.stringify(data) !== '[]') {
          this.graduado = data;
          this.graduadoService
            .obtenerGraduadoEstudianteActivo(this.graduado[0].persona.codigo)
            .subscribe((data) => {
              console.log(data);
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
          this.precargaGraduado(this.graduado[0]);
          this.dataSource = new MatTableDataSource<Graduado>(data);
          this.paginator.firstPage();
          this.dataSource.paginator = this.paginator;
          this.mostrarFoto('' + this.graduado[0].persona.codigo);
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

  precargaGraduado(element: Graduado) {
    this.formGraduado.get('codigo')!.setValue(element.codigo);
    this.formGraduado.get('tipoDocumento')!.setValue(element.persona.documento);
    this.formGraduado
      .get('identificacion')!
      .setValue(element.persona.identificacion);
    this.formGraduado
      .get('fechaExpedicion')!
      .setValue(
        this.datePipe.transform(
          element.persona.fechaExpedicionDocumento,
          'dd-MM-yyyy'
        )
      );
    this.formGraduado
      .get('lugarExpedicion')!
      .setValue(element.persona.lugarExpedicion);
    this.formGraduado.get('nombre')!.setValue(element.persona.nombre);
    this.formGraduado.get('apellido')!.setValue(element.persona.apellido);
    this.formGraduado.get('correo')!.setValue(element.persona.emailPersonal);
    this.formGraduado
      .get('telefonoFijo')!
      .setValue(element.persona.telefonoFijo);
    this.formGraduado
      .get('telefonoMovil')!
      .setValue(element.persona.telefonoMovil);
  }

  loadToken() {
    this.activatedRoute.params.subscribe((params) => {
      let key = params['id'];
    });
  }

  mostrarFoto(perCodigo: String) {
    this.fotoService.mirarFoto(perCodigo).subscribe((data) => {
      var gg = new Blob([data], { type: 'application/json' });
      if (gg.size !== 4) {
        var blob = new Blob([data], { type: 'image/png' });
        const foto = blob;
        const reader = new FileReader();
        reader.onload = () => {
          this.foto.url = reader.result as string;
        };
        reader.readAsDataURL(foto);
      } else {
        this.fotoService
          .mirarFotoAntigua('' + this.graduado[0].persona.codigo)
          .subscribe((data) => {
            this.foto = data;
          });
      }
    });
  }
}
