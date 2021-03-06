import { Component, OnInit } from '@angular/core';
import { Alergia } from '../../share/models/alergia';
import { AlergiaEntidad } from '../../share/models/alergia-entidad';
import { AlergiaService } from '../../share/alergia.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/share/notification.service';

@Component({
  selector: 'app-alergia-all',
  templateUrl: './alergia-all.component.html',
  styleUrls: ['./alergia-all.component.css']
})
export class AlergiaAllComponent implements OnInit {
  datos: Alergia;
  alergias: AlergiaEntidad;
  error: {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alergiaService: AlergiaService,
    private notification: NotificationService
  ) {
    this.mostrarAlergias();
  }

  ngOnInit() {
    let notifC = false;
    let notifM = false;
    let notieM = false;
    let notres = false;
    // Mensajes
    this.route.queryParams.subscribe(params => {
      notifC = params.create || false;
      notifM = params.update || false;
      notieM = params.delete || false;
      notres = params.restaurar || false;
    });
    if (notifC) {
      this.notification.msjSuccess('Alergia creada!', 'Crear Alergia');
    }
    if (notifM) {
      this.notification.msjSuccess(
        'Alergia actualizada!',
        'Actualizar Alergia'
      );
    }
    if (notres) {
      this.notification.msjSuccess('Alergia restaurada!', 'Restaurar Alergia');
    }
    // suscripcion para el consumo del servicio
  }

  mostrarAlergias() {
    // suscripcion para el consumo del servicio
    this.alergiaService.getAlergias().subscribe(
      (respuesta: Alergia) => {
        this.datos = respuesta;
        console.log(this.datos);
      },
      error => (this.error = error)
    );
  }
  linkEditar(id: number) {
    this.router.navigate(['/alergia/update/', id], { relativeTo: this.route });
  }
  linkEliminar(id: number) {
    return this.alergiaService.dropAlergia(id).subscribe(
      (respuesta: void) => {
        this.router.navigate(['/alergiaM/lista'], {
          queryParams: { delete: 'true' }
        });
      },
      error => {},
      () => {
        this.mostrarAlergias();
        this.notification.msjSuccess(
          'Eliminar Alergia',
          'Alergia eliminada exitosamente'
        );
      }
    );
  }

  obtenerImagen(ruta_imagen: string) {
    return this.alergiaService.obtenerImagenService(ruta_imagen);
  }
}
