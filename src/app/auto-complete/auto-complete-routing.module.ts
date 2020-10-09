import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';

const routes: Routes = [
  {
    path: '',
    component: AutoCompleteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoCompleteRoutingModule {}
