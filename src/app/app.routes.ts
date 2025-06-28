import { Routes } from '@angular/router';
import { ShowAllComponent } from './components/show-all/show-all.component';

export const routes: Routes = [
  { path: ':categoryName', component: ShowAllComponent },
];
