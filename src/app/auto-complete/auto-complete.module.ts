import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteRoutingModule } from './auto-complete-routing.module';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';

@NgModule({
  declarations: [AutoCompleteComponent],
  imports: [AutoCompleteRoutingModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [AutoCompleteComponent],
})
export class AutoCompleteModule {}
