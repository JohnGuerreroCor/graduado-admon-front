import { Component } from '@angular/core';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css'],
})
export class EncuestasComponent {
  links = [
    {
      titulo: 'Egresado',
      ruta: '/egresado',
      icono: 'fa-solid fa-file-pen fa-8x p-4 text-center color-icon color-icon',
      info: 'Lectura con cámara del qr para la identificación del usuario a ingresar o salir a la institución y registro manual para casos excepcionales.',
    },
    {
      titulo: 'Graduado 1 año',
      ruta: '/desarrollo',
      icono: 'fa-solid fa-user-graduate fa-8x p-4 text-center color-icon',
      info: 'Generación de tiquetes de acceso para las personas externas a la institución.',
    },
    {
      titulo: 'Graduado 5 años',
      ruta: '/desarrollo',
      icono: 'fa-solid fa-graduation-cap fa-8x p-4 text-center color-icon',
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
