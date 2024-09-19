import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  links = [
    {
      titulo: 'Encuestas',
      ruta: '/encuestas',
      icono: 'fa-solid fa-file-pen fa-8x p-4 text-center color-icon color-icon',
      info: 'Lectura con cámara del qr para la identificación del usuario a ingresar o salir a la institución y registro manual para casos excepcionales.',
    },
    {
      titulo: 'Tasa de graduación',
      ruta: '/tasa-graduacion',
      icono: 'fa-solid fa-chart-pie fa-8x p-4 text-center color-icon',
      info: 'Generación de tiquetes de acceso para las personas externas a la institución.',
    },
    {
      titulo: 'Puesto de votación',
      ruta: '/puesto-votacion',
      icono: 'fa-solid fa-check-to-slot fa-8x p-4 text-center color-icon',
      info: 'Generación de tiquetes de acceso para las personas externas a la institución.',
    },
    {
      titulo: 'Reportes',
      ruta: '/reportes',
      icono: 'fa-solid fa-chart-simple fa-8x p-4 text-center color-icon',
      info: 'Generación de tiquetes de acceso para las personas externas a la institución.',
    },
  ];

  anio!: number;
  fecha = new Date();
  url: string = environment.URL_BACKEND;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
    }
    this.anio = this.fecha.getUTCFullYear();
  }

  mensajeError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ocurrio Un Error!',
    });
  }

  mensajeSuccses() {
    Swal.fire({
      icon: 'success',
      title: 'Proceso Realizado',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  fError(er: any): void {
    let err = er.error.error_description;
    let arr: string[] = err.split(':');

    if (arr[0] == 'Access token expired') {
      this.auth.logout();
      this.router.navigate(['login']);
    } else {
      this.mensajeError();
    }
  }
}
