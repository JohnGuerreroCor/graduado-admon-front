import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { MencionReconocimiento } from '../models/mencion-reconocimiento';

@Injectable({
  providedIn: 'root',
})
export class MencionReconocimientoService {
  private url: string = `${environment.URL_BACKEND}/mencionreconocimiento`;
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

  obtenerMencionesReconocimiento(
    id: string
  ): Observable<MencionReconocimiento[]> {
    return this.http
      .get<MencionReconocimiento[]>(
        `${this.url}/obtener-mencion-reconocimiento/${id}`,
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

  obtenerReporteMencionesReconocimiento(
    inicio: any,
    fin: any
  ): Observable<MencionReconocimiento[]> {
    return this.http
      .get<MencionReconocimiento[]>(
        `${this.url}/obtener-reporte-mencion-reconocimiento/${inicio}/${fin}`,
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
