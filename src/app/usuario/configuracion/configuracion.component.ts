import { Component, OnInit } from '@angular/core';
import { UserEntidad } from 'src/app/share/models/user-entidad';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/share/authentication-service.service';
import { UsuarioLogin } from 'src/app/share/models/usuario-Login';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  UsuarioActual: UsuarioLogin;
  datos: UserEntidad;
  error: any;

  constructor(private router: Router, private autentificacion: AuthenticationServiceService) {
    // llama la funcion para que traiga los roles
    this.autentificacion.currentUser.subscribe(x => (this.UsuarioActual = x));
  }
  // cuando envia los datos
  onsubmit(obj: UserEntidad) {
    this.autentificacion.updateUser(obj).subscribe((respuesta: UserEntidad) => (this.datos),  error => (this.error = error),
    // complete
    () => {
      this.router.navigate(['/home/inicio']);
    }
    );
  }


  ngOnInit() {
  }

}
