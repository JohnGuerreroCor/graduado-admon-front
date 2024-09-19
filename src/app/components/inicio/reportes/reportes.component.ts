import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent {
  links = [
    {
      titulo: 'Reporte Encuesta Egresado',
      ruta: '/reporte-egresado',
      icono:
        'fa-solid fa-school-circle-check fa-8x p-4 text-center color-icon color-icon',
      info: 'Lectura con cámara del qr para la identificación del usuario a ingresar o salir a la institución y registro manual para casos excepcionales.',
    },
    {
      titulo: 'Reporte Encuesta Graduado',
      ruta: '/reporte-graduado',
      icono: 'fa-solid fa-user-graduate fa-8x p-4 text-center color-icon',
      info: 'Generación de tiquetes de acceso para las personas externas a la institución.',
    },
    {
      titulo: 'Listado de Graduados para Elecciones',
      ruta: '/reporte-listado-graduados-elecciones',
      icono: 'fa-solid fa-check-to-slot fa-8x p-4 text-center color-icon',
      info: 'Generación de tiquetes de acceso para las personas externas a la institución.',
    },
    {
      titulo: 'Inicio',
      ruta: '/inicio',
      icono: 'fa-solid fa-house fa-8x p-4 text-center color-icon',
      info: 'Generación de tiquetes de acceso para las personas externas a la institución.',
    },
  ];
}
