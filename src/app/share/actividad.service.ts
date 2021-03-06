import { Injectable } from '@angular/core';
import { UsuarioLogin } from './models/usuario-login';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from './authentication-service.service';
import { CustomHandlerErrorService } from './custom-handler-error-service.service';
import { Actividad } from './models/actividad';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  currentUser: UsuarioLogin;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  ServerUrl = environment.apiURL;
  errorData: {};
  user: null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationServiceService,
    private handler: CustomHandlerErrorService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }
  getActividad(): Observable<Actividad> {
    let headers = new HttpHeaders();
    if (this.currentUser) {
      headers = headers.append(
        'Authorization',
        'Bearer' + this.currentUser.access_token
      );
    }
    return this.http
      .get<Actividad>(this.ServerUrl + 'expediente/actividad', { headers } ) .pipe(
        catchError(this.handler.handleError.bind(this))
      );
  }
  obtenerImagenService(rutaImagen) {
    return this.ServerUrl + 'expediente/obtenerImagenActividad/' + rutaImagen;
  }
}
