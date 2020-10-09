import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LogFilter } from '../log-filter/log-filter.component';
import { ALL_LOG_LEVELS, LogLevel, LogRecord } from '../log.model';
import { CalculationService } from '../calculation.service';
import { Calculation } from '../calculation.model';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogComponent implements OnInit {
  filteredLog$: Observable<LogRecord[]>;
  logFilters$: Observable<LogFilter[]>;

  activatedFilters = new FormControl([]);

  calculations: Calculation[] = [];
  activeCalculationId: number | null = null;

  constructor(private readonly calcuation: CalculationService) {}

  ngOnInit(): void {

  }

  addCalculation() {
    const newCalculation = this.calcuation.calculate();
    this.calculations = [...this.calculations, newCalculation];
    this.setCalculation(newCalculation);
  }

  setCalculation(calculation: Calculation) {
    const log$ = calculation.logs$;
    const filter$ = this.activatedFilters.valueChanges.pipe(startWith(this.activatedFilters.value));

    this.filteredLog$ = combineLatest([log$, filter$]).pipe(
      map(([log, filter]) => log.filter(({ level }) => !filter.length || filter.includes(level))),
    );

    this.logFilters$ = log$.pipe(
      map(log => {
        const counts = this.countLevels(log.map(({ level }) => level));
        const filters = ALL_LOG_LEVELS.map(level => ({ level, count: counts.get(level) || 0 }));

        return filters;
      }),
    );

    this.activeCalculationId = calculation.id;
  }

  private countLevels(levels: LogLevel[]): Map<LogLevel, number> {
    const counts = new Map<LogLevel, number>();
    levels.forEach(level => {
      counts.set(level, (counts.get(level) || 0) + 1);
    });
    return counts;
  }
}
