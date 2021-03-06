import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ServicioConsultaModule } from './servicio-consulta/servicio-consulta.module';

const routes: Routes = [
  {
    path: "usuario",
    loadChildren: () => import("./usuario/usuario.module").then(mod => mod.UsuarioModule)
  },
  {
    path: "home",
    // loadChildren: "./home/home.module#HomeModule"
    loadChildren: () => import("./home/home.module").then(mod => mod.HomeModule)
  },
  {
    path: "servicio",
    // loadChildren: "./home/home.module#HomeModule"
    loadChildren: () => import("./servicio-consulta/servicio-consulta.module").then(mod => mod.ServicioConsultaModule)
  },
  {
    path: "perfil",
    // loadChildren: "./home/home.module#HomeModule"
    loadChildren: () => import("./perfil/perfil.module").then(mod => mod.PerfilModule)
  },
  {
    path: 'expediente',
    loadChildren: () => import('./expediente/expediente.module').then(mod => mod.ExpedienteModule)
  },
  {
    path: 'alergia',
    loadChildren: () =>
      import('./alergia/alergia.module').then(mod => mod.AlergiaModule)
  },
  {
    path: 'enfermedad',
    loadChildren: () =>
      import('./enfermedad/enfermedad.module').then(mod => mod.EnfermedadModule)
  },
  {
    path: 'actividad',
    loadChildren: () =>
      import('./actividad/actividad.module').then(mod => mod.ActividadModule)
  },
  {
    path: 'horario',
    loadChildren: () =>
      import('./horario/horario.module').then(mod => mod.HorarioModule)
  },
  {
    path: 'agenda',
    loadChildren: () =>
      import('./agenda/agenda.module').then(mod => mod.AgendaModule)
  },
  { path: "", redirectTo: "", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
