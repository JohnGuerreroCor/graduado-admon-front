import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { SituacionLaboralRespuesta } from '../models/situacion-laboral-respuesta';
import { ReporteSituacionLaboral } from '../models/reporte-situacion-laboral';

@Injectable({
  providedIn: 'root',
})
export class SituacionLaboralService {
  private url: string = `${environment.URL_BACKEND}/situacionlaboral`;
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

  obtenerRespuestasIdentificacion(
    id: string
  ): Observable<SituacionLaboralRespuesta[]> {
    return this.http
      .get<SituacionLaboralRespuesta[]>(
        `${this.url}/obtener-respuestas-identificacion/${id}`,
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

  obtenerRerporteSituacionLaboral(
    inicio: any,
    fin: any
  ): Observable<ReporteSituacionLaboral[]> {
    return this.http
      .get<ReporteSituacionLaboral[]>(
        `${this.url}/obtener-reporte-situacion-laboral/${inicio}/${fin}`,
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
