import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

export interface Item {
  id: number;
  caption: string;
  description: string;
  isFavorite?: boolean;
}

export interface Favorite {
  id: number;
  caption: string;
}

export const ALL_ITEMS: Item[] = [
  { id: 0, caption: 'Angular', description: 'Description for Angular', isFavorite: true },
  { id: 1, caption: 'RxJS', description: 'Description for RxJS', isFavorite: true },
  { id: 2, caption: 'Angular Days', description: 'Description for Angular Days' },
  { id: 3, caption: 'React', description: 'Description for React' },
  { id: 4, caption: 'PHP', description: 'Description for PHP' },
];

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  public readonly items$ = new BehaviorSubject<Item[]>([]);
  public readonly favorites$ = this.items$.pipe(
    map(items => items.filter(item => !!item.isFavorite)),
    map(items => items.map(({ id, caption }) => ({ id, caption }))),
  );

  public start(): void {
    this.getItems()
      .pipe(tap(items => this.items$.next(items)))
      .subscribe();
  }

  public toggleFavorite(id: number): Observable<Item> {
    const toggled = this.items$.value.map(item => {
      const isFavorite = item.id === id ? !item.isFavorite : item.isFavorite;
      return { ...item, isFavorite };
    });

    const updated = toggled.find(item => item.id === id);
    if (!updated) {
      return throwError(`Could not find item with id ${id}`);
    }

    return of(updated).pipe(
      delay(50),
      tap(() => this.items$.next(toggled)),
    );
  }

  private getItems(): Observable<Item[]> {
    return of(ALL_ITEMS);
  }
}
