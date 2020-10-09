import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LogLevel } from '../log.model';

export interface LogFilter {
  count: number;
  level: LogLevel;
}

interface CheckableFilter extends LogFilter {
  checked: boolean;
}

@Component({
  selector: 'app-log-filter',
  templateUrl: './log-filter.component.html',
  styleUrls: ['./log-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: LogFilterComponent, multi: true }],
})
export class LogFilterComponent implements OnChanges, ControlValueAccessor {
  @Input() filters: LogFilter[] = [];

  state: CheckableFilter[] = [];

  private onChange = (value: LogLevel[]) => {};
  private onTouched = () => {};

  ngOnChanges(): void {
    this.writeValue(this.getValue(this.state));
  }

  toggle(filter: CheckableFilter): void {
    this.state = this.state.map(oldFilter => (filter.level === oldFilter.level ? { ...filter, checked: !filter.checked } : oldFilter));
    this.onTouched();
    this.onChange(this.getValue(this.state));
  }

  trackByLevel(index: number, { level }: CheckableFilter): LogLevel {
    return level;
  }

  writeValue(value?: LogLevel[]): void {
    const checkedLevels = value || [];
    this.state = (this.filters || []).map(({ level, ...filter }) => {
      const checked = checkedLevels.includes(level);
      return { ...filter, level, checked };
    });
  }

  registerOnChange(fn: (value: LogLevel[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private getValue(state: CheckableFilter[]): LogLevel[] {
    return this.state.filter(({ checked }) => checked).map(({ level }) => level);
  }
}
