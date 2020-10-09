import { Injectable } from '@angular/core';
import { ConnectableObservable, interval, Subject } from 'rxjs';
import { endWith, map, publish, take, tap } from 'rxjs/operators';
import { Calculation, CalculationProgress } from './calculation.model';
import { ALL_LOG_LEVELS, LogLevel, LogRecord } from './log.model';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  private idCounter = 0;
  private readonly progress$ = new Subject<CalculationProgress>();

  calculate(): Calculation {
    const calculationId = this.idCounter++;

    const calculationProgress = this.makeProgressSource(calculationId, this.progress$);
    calculationProgress.connect();

    return new Calculation(calculationId, this.progress$);
  }

  private makeProgressSource(calculationId: number, outlet: Subject<CalculationProgress>): ConnectableObservable<CalculationProgress> {
    return interval(1000).pipe(
      map(() => ({ calculationId, isFinished: false, log: this.makeRecord() })),
      take(20),
      endWith({ calculationId, isFinished: true, log: this.makeRecord() }),
      tap(v => outlet.next(v)),
      publish(),
    ) as ConnectableObservable<CalculationProgress>;
  }

  private makeRecord(): LogRecord {
    const time = new Date().toISOString();
    const level = this.getRandomLevel();
    const message = 'Random Message';

    return { time, level, message };
  }

  private getRandomLevel(): LogLevel {
    const levels = ALL_LOG_LEVELS;
    return levels[Math.floor(Math.random() * levels.length)];
  }
}
