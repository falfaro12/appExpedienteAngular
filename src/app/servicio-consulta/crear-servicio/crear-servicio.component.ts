import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioConsultaService } from 'src/app/share/servicio-consulta.service';
import { NotificacionService } from 'src/app/share/notificacion.service.service';
import { Especialidad } from 'src/app/share/models/especialidad';
import { ServicioConsulta } from 'src/app/share/models/ServicioConsulta';
import { ServicioConsultasEntidad } from 'src/app/share/models/ServicioConsultas-entidad';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent implements OnInit {
  datos: ServicioConsulta;
  especialidad: Especialidad;
  error: any;
  constructor(
    private router: Router,
    private servicioService: ServicioConsultaService,
    private notificacion: NotificacionService
  ) {
    this.getEspecialidad();
  }

  getEspecialidad() {
    return this.servicioService.getEspecialidad().subscribe(
      (respuesta: Especialidad) => (this.especialidad = respuesta),
      error => {
        this.error = error;
        this.notificacion.msjError(this.error, 'Especialidades');
      }
    );
  }

  ngOnInit() {
  }
  onSubmit(obj: ServicioConsultasEntidad) {
    return this.servicioService.createServicio(obj).subscribe(
      (respuesta: ServicioConsulta) => {
        this.datos = respuesta;
        this.router.navigate(['/MantServicioConsulta/lista'], {
          queryParams: { registradoServicio: 'true' }
        });
      },
      error => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }
  onBack() {
    this.router.navigate(['/MantServicioConsulta']);
  }

}
