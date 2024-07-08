import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GraduadoService } from 'src/app/services/graduado.service';
import { FotoService } from 'src/app/services/foto.service';
import { InformacionAcademicaService } from 'src/app/services/informacion-academica.service';
import { DatosComplementarios } from '../../../models/datos-complementarios';

@Component({
  selector: 'app-perfil-profesional',
  templateUrl: './perfil-profesional.component.html',
  styleUrls: ['./perfil-profesional.component.css'],
})
export class PerfilProfesionalComponent {
  identificacion: string = '';
  datosComplementarios: DatosComplementarios[] = [];

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    public graduadoService: GraduadoService,
    public fotoService: FotoService,
    public informacionAcademicaService: InformacionAcademicaService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.identificacion = params['id'];
      this.obtenerDatosComplementarios();
    });
  }

  obtenerDatosComplementarios() {
    this.informacionAcademicaService
      .obtenerDatosComplementarios(this.identificacion)
      .subscribe((data) => {
        this.datosComplementarios = data;
      });
  }
}
