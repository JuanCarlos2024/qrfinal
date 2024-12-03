import { Routes, RouterModule } from '@angular/router';
import { ProfesorPage } from './profesor.page'; 

const routes: Routes = [
  {
    path: '',
    component: ProfesorPage,
  },
];

export const ProfesorPageRoutingModule = RouterModule.forChild(routes);




