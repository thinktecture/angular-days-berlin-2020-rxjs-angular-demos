import { Pipe, PipeTransform } from '@angular/core';
import { LogLevel, LOG_META } from './log.model';

@Pipe({
  name: 'logLevel',
})
export class LogLevelPipe implements PipeTransform {
  transform(level: LogLevel, property = 'caption'): string {
    return (LOG_META[level] || { [property]: 'None' })[property];
  }
}
