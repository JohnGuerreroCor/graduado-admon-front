import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { ProgramaGeneral } from '../models/programa-general';
import { PuestoVotacion } from '../models/puesto-votacion';
import { GraduadosElecciones } from '../models/graduados-elecciones';

@Injectable({
  providedIn: 'root',
})
export class PuestoVotacionService {
  private url: string = `${environment.URL_BACKEND}/puestoVotacion`;
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

  obtenerListadoPuestoVotacion(programa: number): Observable<PuestoVotacion[]> {
    return this.http
      .get<PuestoVotacion[]>(
        `${this.url}/obtener-puesto-votacion/${programa}`,
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

  obtenerListadoGraduadosElecciones(): Observable<GraduadosElecciones[]> {
    return this.http
      .get<GraduadosElecciones[]>(
        `${this.url}/obtener-listado-graduados-elecciones`,
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
