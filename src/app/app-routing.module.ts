import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';

const routes: Routes = [
  { path: '', redirectTo: 'buggy', pathMatch: 'full'},
  { path: 'buggy', component: NavbarComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ]
})

export class AppRoutingModule {
}
