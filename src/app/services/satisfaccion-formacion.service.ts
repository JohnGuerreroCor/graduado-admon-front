import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { CompetenciaRespuesta } from '../models/competencia-respuesta';
import { ReporteCompetencia } from '../models/reporte-competencia';

@Injectable({
  providedIn: 'root',
})
export class SatisfaccionFormacionService {
  private url: string = `${environment.URL_BACKEND}/satisfaccionformacion`;
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

  obtenerRespuestasTipoUnoIdentificacion(
    id: string
  ): Observable<CompetenciaRespuesta[]> {
    return this.http
      .get<CompetenciaRespuesta[]>(
        `${this.url}/obtener-respuestas-tipo-uno-identificacion/${id}`,
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

  obtenerRespuestasTipoDosIdentificacion(
    id: string
  ): Observable<CompetenciaRespuesta[]> {
    return this.http
      .get<CompetenciaRespuesta[]>(
        `${this.url}/obtener-respuestas-tipo-dos-identificacion/${id}`,
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

  obtenerRespuestasTipoTresIdentificacion(
    id: string
  ): Observable<CompetenciaRespuesta[]> {
    return this.http
      .get<CompetenciaRespuesta[]>(
        `${this.url}/obtener-respuestas-tipo-tres-identificacion/${id}`,
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

  obtenerRerporteCompetencia(
    inicio: any,
    fin: any
  ): Observable<ReporteCompetencia[]> {
    return this.http
      .get<ReporteCompetencia[]>(
        `${this.url}/obtener-reporte-competencia/${inicio}/${fin}`,
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
