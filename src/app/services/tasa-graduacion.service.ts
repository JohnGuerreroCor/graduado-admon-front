import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { MencionReconocimiento } from '../models/mencion-reconocimiento';
import { TasaGraduacionPeriodo } from '../models/tasa-graduacion-periodo';
import { TasaGraduacionSemestre } from '../models/tasa-graduacion-semestre';
import { TasaGraduacionPersonas } from '../models/tasa-graduacion-personas';
import { MatriculadosPrimerIngreso } from '../models/matriculados-primer-ingreso';
import { GraduadosPeriodoAcademico } from '../models/graduados-periodo-academico';

@Injectable({
  providedIn: 'root',
})
export class TasaGraduacionService {
  private url: string = `${environment.URL_BACKEND}/tasaGraduacion`;
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  userLogeado: String = this.authservice.user.username;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authservice: AuthService
  ) {}

  private aggAutorizacionHeader(): HttpHeaders {
    let token = this.authservice.Token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e: { status: number }): boolean {
    if (e.status == 401 || e.status == 403) {
      if (this.authservice.isAuthenticated()) {
        this.authservice.logout();
      }
      this.router.navigate(['login']);
      return true;
    }
    return false;
  }

  obtenerInformacionPrograma(
    codigo: number
  ): Observable<TasaGraduacionSemestre[]> {
    return this.http
      .get<TasaGraduacionSemestre[]>(
        `${this.url}/obtener-informacion-programa/${codigo}`,
        {
          headers: this.aggAutorizacionHeader(),
        }
      )
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  obtenerMatriculadosPrimerIngreso(
    codigo: number
  ): Observable<MatriculadosPrimerIngreso[]> {
    return this.http
      .get<MatriculadosPrimerIngreso[]>(
        `${this.url}/obtener-matriculados-primer-ingreso/${codigo}`,
        {
          headers: this.aggAutorizacionHeader(),
        }
      )
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  obtenerGraduadosPeriodoAcademico(
    codigo: number
  ): Observable<GraduadosPeriodoAcademico[]> {
    return this.http
      .get<GraduadosPeriodoAcademico[]>(
        `${this.url}/obtener-graduados-periodo-academico/${codigo}`,
        {
          headers: this.aggAutorizacionHeader(),
        }
      )
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  obtenerEstudiantesPrimerIngreso(
    codigo: number,
    periodoInicial: string,
    periodoFinal: string
  ): Observable<TasaGraduacionPersonas[]> {
    return this.http
      .get<TasaGraduacionPersonas[]>(
        `${this.url}/obtener-tasa-graduacion-matriculados/${periodoInicial}/${periodoFinal}/${codigo}`,
        {
          headers: this.aggAutorizacionHeader(),
        }
      )
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  obtenerPeriodosMatriculados(
    codigo: number
  ): Observable<TasaGraduacionPeriodo[]> {
    return this.http
      .get<TasaGraduacionPeriodo[]>(
        `${this.url}/obtener-tasa-graduacion-periodo/${codigo}`,
        {
          headers: this.aggAutorizacionHeader(),
        }
      )
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  obtenerGraduados(
    codigo: number,
    periodo: any
  ): Observable<TasaGraduacionPersonas[]> {
    return this.http
      .get<TasaGraduacionPersonas[]>(
        `${this.url}/obtener-tasa-graduacion-graduados/${codigo}/${periodo}`,
        {
          headers: this.aggAutorizacionHeader(),
        }
      )
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }
}
