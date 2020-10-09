import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Category {
  id: string;
  caption: string;
}

const CATEGORIES = [
  { id: 'fruit', caption: 'Fruit', description: 'Description of Category: Fruit' },
  { id: 'vegetable', caption: 'Vegetable', description: 'Description of Category: Vegetable' },
  { id: 'clothing', caption: 'Clothing', description: 'Description of Category: Clothing' },
];

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  list(): Observable<Category[]> {
    return of(CATEGORIES).pipe(tap(c => console.log('Requesting Categories:', c)));
  }

  byId(id: string): Observable<Category> {
    const found = CATEGORIES.find(category => category.id === id);
    if (found) {
      return of(found);
    }
    return throwError(`Could not find Category with id ${id}`);
  }
}
