import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { TokenComponent } from './components/token/token.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DesarrolloComponent } from './components/desarrollo/desarrollo.component';
import { EstudianteActivoComponent } from './components/estudiante-activo/estudiante-activo.component';
import { GraduadoComponent } from './components/graduado/graduado.component';
import { EncuestasComponent } from './components/inicio/encuestas/encuestas.component';
import { EncuestaGraduadoComponent } from './components/encuesta-graduado/encuesta-graduado.component';
import { EgresadoComponent } from './components/egresado/egresado.component';
import { FormularioEgresadoComponent } from './components/formulario-egresado/formulario-egresado.component';
import { CurriculumEgresadoComponent } from './components/curriculum-egresado/curriculum-egresado.component';
import { PuestoVotacionComponent } from './components/puesto-votacion/puesto-votacion.component';
import { ReportesComponent } from './components/inicio/reportes/reportes.component';
import { ReporteEgresadoComponent } from './components/reporte-egresado/reporte-egresado.component';
import { ReporteGraduadoComponent } from './components/reporte-graduado/reporte-graduado.component';
import { TasaGraduacionComponent } from './components/tasa-graduacion/tasa-graduacion.component';
import { ReporteEleccionesComponent } from './components/reporte-elecciones/reporte-elecciones.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: 'acceso-denegado', component: NotfoundComponent },

  { path: 'login', component: LoginComponent },
  { path: 'token', component: TokenComponent },

  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  {
    path: 'encuestas',
    component: EncuestasComponent,
    canActivate: [AuthGuard],
  },
  { path: 'reportes', component: ReportesComponent, canActivate: [AuthGuard] },

  {
    path: 'estudiante-activo',
    component: EstudianteActivoComponent,
    canActivate: [AuthGuard],
  },
  { path: 'graduado', component: GraduadoComponent, canActivate: [AuthGuard] },
  {
    path: 'reporte-graduado',
    component: ReporteGraduadoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reporte-listado-graduados-elecciones',
    component: ReporteEleccionesComponent,
    canActivate: [AuthGuard],
  },

  { path: 'egresado', component: EgresadoComponent, canActivate: [AuthGuard] },
  {
    path: 'reporte-egresado',
    component: ReporteEgresadoComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'encuesta-seguimiento/:id',
    component: EncuestaGraduadoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'formulario-egresado/:id',
    component: FormularioEgresadoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'curriculum-egresado/:id',
    component: CurriculumEgresadoComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'puesto-votacion',
    component: PuestoVotacionComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'tasa-graduacion',
    component: TasaGraduacionComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'desarrollo',
    component: DesarrolloComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: 'acceso-denegado' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
