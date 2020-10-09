import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LogRecord } from '../log.model';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogListComponent {
  @Input() records: LogRecord[];
}
