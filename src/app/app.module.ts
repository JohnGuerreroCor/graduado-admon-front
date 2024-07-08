import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEsCO from '@angular/common/locales/es-CO';

import { MaterialModules } from './material.modules';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenComponent } from './components/token/token.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DesarrolloComponent } from './components/desarrollo/desarrollo.component';
import { EstudianteActivoComponent } from './components/estudiante-activo/estudiante-activo.component';
import { GraduadoComponent } from './components/graduado/graduado.component';
import { EncuestasComponent } from './components/inicio/encuestas/encuestas.component';
import { DatePipe } from '@angular/common';
import { EncuestaGraduadoComponent } from './components/encuesta-graduado/encuesta-graduado.component';
import {
  DatosPersonalesComponent,
  ModalExpedicion,
  ModalContacto,
  ModalResidencia,
} from './components/encuesta-graduado/datos-personales/datos-personales.component';
import { SituacionLaboralComponent } from './components/encuesta-graduado/situacion-laboral/situacion-laboral.component';
import { SatisfaccionFormacionComponent } from './components/encuesta-graduado/satisfaccion-formacion/satisfaccion-formacion.component';
import { ExpectativasCapacitacionComponent } from './components/encuesta-graduado/expectativas-capacitacion/expectativas-capacitacion.component';
import {
  DistincionesReconocimientosComponent,
  ModalMembresia,
} from './components/encuesta-graduado/distinciones-reconocimientos/distinciones-reconocimientos.component';
import {
  FormacionAcademicaComponent,
  ModalEstudio,
} from './components/encuesta-graduado/formacion-academica/formacion-academica.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { EgresadoComponent } from './components/egresado/egresado.component';
import { FormularioEgresadoComponent } from './components/formulario-egresado/formulario-egresado.component';
import { ExperienciaLaboralComponent } from './components/formulario-egresado/experiencia-laboral/experiencia-laboral.component';
import { InformacionAcademicaComponent } from './components/formulario-egresado/informacion-academica/informacion-academica.component';
import { PerfilProfesionalComponent } from './components/formulario-egresado/perfil-profesional/perfil-profesional.component';
import { DatosPersonalesEgresadoComponent } from './components/formulario-egresado/datos-personales-egresado/datos-personales-egresado.component';
import { CurriculumEgresadoComponent } from './components/curriculum-egresado/curriculum-egresado.component';
import { PuestoVotacionComponent } from './components/puesto-votacion/puesto-votacion.component';
import { ReportesComponent } from './components/inicio/reportes/reportes.component';
import { ReporteEgresadoComponent } from './components/reporte-egresado/reporte-egresado.component';
import { ReporteExperienciaLaboralComponent } from './components/reporte-egresado/reporte-experiencia-laboral/reporte-experiencia-laboral.component';
import { ReportePerfilProfesionalComponent } from './components/reporte-egresado/reporte-perfil-profesional/reporte-perfil-profesional.component';
import { ReporteInformacionAcademicaComponent } from './components/reporte-egresado/reporte-informacion-academica/reporte-informacion-academica.component';
import { ReporteGraduadoComponent } from './components/reporte-graduado/reporte-graduado.component';
import { ReporteSatisfaccionFormacionComponent } from './components/reporte-graduado/reporte-satisfaccion-formacion/reporte-satisfaccion-formacion.component';
import { ReporteSituacionLaboralComponent } from './components/reporte-graduado/reporte-situacion-laboral/reporte-situacion-laboral.component';
import { ReporteFormacionAcademicaComponent } from './components/reporte-graduado/reporte-formacion-academica/reporte-formacion-academica.component';
import { ReporteExpectativasCapacitacionComponent } from './components/reporte-graduado/reporte-expectativas-capacitacion/reporte-expectativas-capacitacion.component';
import { ReporteDistincionesReconocimientosComponent } from './components/reporte-graduado/reporte-distinciones-reconocimientos/reporte-distinciones-reconocimientos.component';
import { TasaGraduacionComponent } from './components/tasa-graduacion/tasa-graduacion.component';
import { NgxPrintModule } from 'ngx-print';
import { ReporteEleccionesComponent } from './components/reporte-elecciones/reporte-elecciones.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

registerLocaleData(localeEsCO, 'es-CO');

@NgModule({
  declarations: [
    AppComponent,
    TokenComponent,
    LoginComponent,
    NavbarComponent,
    InicioComponent,
    DesarrolloComponent,
    EstudianteActivoComponent,
    GraduadoComponent,
    EncuestasComponent,
    EncuestaGraduadoComponent,
    DatosPersonalesComponent,
    SituacionLaboralComponent,
    SatisfaccionFormacionComponent,
    ExpectativasCapacitacionComponent,
    DistincionesReconocimientosComponent,
    FormacionAcademicaComponent,
    ModalMembresia,
    ModalEstudio,
    ModalExpedicion,
    ModalContacto,
    ModalResidencia,
    EgresadoComponent,
    FormularioEgresadoComponent,
    ExperienciaLaboralComponent,
    InformacionAcademicaComponent,
    PerfilProfesionalComponent,
    DatosPersonalesEgresadoComponent,
    CurriculumEgresadoComponent,
    PuestoVotacionComponent,
    ReportesComponent,
    ReporteEgresadoComponent,
    ReporteExperienciaLaboralComponent,
    ReportePerfilProfesionalComponent,
    ReporteInformacionAcademicaComponent,
    ReporteGraduadoComponent,
    ReporteSatisfaccionFormacionComponent,
    ReporteSituacionLaboralComponent,
    ReporteFormacionAcademicaComponent,
    ReporteExpectativasCapacitacionComponent,
    ReporteDistincionesReconocimientosComponent,
    TasaGraduacionComponent,
    ReporteEleccionesComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
  ],
  entryComponents: [
    ModalEstudio,
    ModalMembresia,
    ModalExpedicion,
    ModalContacto,
    ModalResidencia,
  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: LOCALE_ID, useValue: 'es-CO' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
