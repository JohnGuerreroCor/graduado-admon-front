import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GraduadoService } from 'src/app/services/graduado.service';
import { FotoService } from 'src/app/services/foto.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { SituacionLaboralRespuesta } from 'src/app/models/situacion-laboral-respuesta';
import { SituacionLaboralService } from 'src/app/services/situacion-laboral.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@Component({
  selector: 'app-situacion-laboral',
  templateUrl: './situacion-laboral.component.html',
  styleUrls: ['./situacion-laboral.component.css'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
  ],
})
export class SituacionLaboralComponent {
  listadoRespuestas: SituacionLaboralRespuesta[] = [];

  identificacion: string = '';

  formDatosPersonales!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    public graduadoService: GraduadoService,
    public fotoService: FotoService,
    public ubicacionService: UbicacionService,
    public datosPersonalesService: DatosPersonalesService,
    public situacionLaboralService: SituacionLaboralService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.identificacion = params['id'];
      this.situacionLaboralService
        .obtenerRespuestasIdentificacion(this.identificacion)
        .subscribe((data) => {
          this.listadoRespuestas = data;
          console.log(this.listadoRespuestas);
        });
    });
  }
}
