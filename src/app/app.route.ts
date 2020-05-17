import { ProjectsComponent } from './projects/projects.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users/users.component';
import { OverviewComponent } from './overview/overview.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'overview',
    component: OverviewComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
