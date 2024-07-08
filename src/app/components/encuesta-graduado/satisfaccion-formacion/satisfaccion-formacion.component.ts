import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GraduadoService } from 'src/app/services/graduado.service';
import { FotoService } from 'src/app/services/foto.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { CompetenciaRespuesta } from 'src/app/models/competencia-respuesta';
import { SatisfaccionFormacionService } from 'src/app/services/satisfaccion-formacion.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@Component({
  selector: 'app-satisfaccion-formacion',
  templateUrl: './satisfaccion-formacion.component.html',
  styleUrls: ['./satisfaccion-formacion.component.css'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
  ],
})
export class SatisfaccionFormacionComponent {
  listadoRespuestasUno: CompetenciaRespuesta[] = [];
  listadoRespuestasDos: CompetenciaRespuesta[] = [];
  listadoRespuestasTres: CompetenciaRespuesta[] = [];

  identificacion: string = '';
  formDatosPersonales!: FormGroup;
  options: number[] = [1, 2, 3, 4];

  constructor(
    private activatedRoute: ActivatedRoute,
    public graduadoService: GraduadoService,
    public fotoService: FotoService,
    public ubicacionService: UbicacionService,
    public datosPersonalesService: DatosPersonalesService,
    public satisfaccionFormacionService: SatisfaccionFormacionService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.identificacion = params['id'];
      this.satisfaccionFormacionService
        .obtenerRespuestasTipoUnoIdentificacion(this.identificacion)
        .subscribe((data) => {
          this.listadoRespuestasUno = data;
        });
      this.satisfaccionFormacionService
        .obtenerRespuestasTipoDosIdentificacion(this.identificacion)
        .subscribe((data) => {
          this.listadoRespuestasDos = data;
        });
      this.satisfaccionFormacionService
        .obtenerRespuestasTipoTresIdentificacion(this.identificacion)
        .subscribe((data) => {
          this.listadoRespuestasTres = data;
          console.log(this.listadoRespuestasTres);
        });
    });
  }
}
