import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogFilterComponent } from './log-filter/log-filter.component';
import { LogLevelPipe } from './log-level.pipe';
import { LogListComponent } from './log-list/log-list.component';
import { LogRoutingModule } from './log-routing.module';
import { LogComponent } from './log/log.component';

@NgModule({
  declarations: [LogFilterComponent, LogListComponent, LogComponent, LogLevelPipe],
  imports: [LogRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [LogComponent],
})
export class LogModule {}
