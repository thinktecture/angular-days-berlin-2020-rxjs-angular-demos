import { ConnectableObservable, Observable, ReplaySubject } from 'rxjs';
import { filter, last, mapTo, multicast, scan, takeWhile } from 'rxjs/operators';
import { LogRecord } from './log.model';

export interface CalculationProgress {
  calculationId: number;
  log: LogRecord;
  isFinished: boolean;
}

export class Calculation {
  public readonly logs$ = new ReplaySubject<LogRecord[]>(1);
  public readonly finished$ = this.logs$.pipe(mapTo(void 0), last());

  constructor(readonly id: number, progress$: Observable<CalculationProgress>) {
    const logCollector$ = this._makeLogs$(id, progress$).pipe(multicast(() => this.logs$));
    (logCollector$ as ConnectableObservable<any[]>).connect();
  }

  private _makeLogs$(id: number, progress$: Observable<CalculationProgress>): Observable<LogRecord[]> {
    return progress$.pipe(
      filter(({ calculationId }) => calculationId === id),
      takeWhile(({ isFinished }) => !isFinished),
      scan((logs, { log }) => logs.concat(log || []), [] as LogRecord[]),
    );
  }
}
