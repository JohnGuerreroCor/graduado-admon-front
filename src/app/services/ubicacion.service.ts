import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Pais } from '../models/pais';
import { Departamento } from '../models/departamento';
import { Municipio } from '../models/municipio';

@Injectable({
  providedIn: 'root',
})
export class UbicacionService {
  private url: string = `${environment.URL_BACKEND}/ubicacion`;
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

  obtenerPaises(): Observable<Pais[]> {
    return this.http
      .get<Pais[]>(`${this.url}/obtener-paises/${this.userLogeado}`, {
        headers: this.aggAutorizacionHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  obtenerMunicipios(): Observable<Municipio[]> {
    return this.http
      .get<Municipio[]>(`${this.url}/obtener-municipios/${this.userLogeado}`, {
        headers: this.aggAutorizacionHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  obtenerDepartamentosPorPais(codigo: number): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(
      `${this.url}/obtener-departamentos-pais/${codigo}/${this.userLogeado}`,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  obtenerMunicipiosPorDepartamento(codigo: number): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(
      `${this.url}/obtener-municipios-departamento/${codigo}/${this.userLogeado}`,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  obtenerDepartamentosPorMunicipio(codigo: number): Observable<Departamento[]> {
    console.log("Entra");
    return this.http.get<Departamento[]>(
      `${this.url}/obtener-departamentos-municipio/${codigo}/${this.userLogeado}`,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  obtenerPaisesPorDepartamento(codigo: number): Observable<Pais[]> {
    return this.http.get<Pais[]>(
      `${this.url}/obtener-paises-departamento/${codigo}/${this.userLogeado}`,
      { headers: this.aggAutorizacionHeader() }
    );
  }
}
