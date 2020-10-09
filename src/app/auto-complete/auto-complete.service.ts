import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

export interface AutoCompleteOption {
  caption: string;
  value: string;
}

const DATA = [
  { caption: 'Apple', value: 'apple' },
  { caption: 'Banana', value: 'banana' },
  { caption: 'Beet', value: 'beet' },
  { caption: 'Carrot', value: 'carrot' },
  { caption: 'Coconut', value: 'coconut' },
  { caption: 'Cucumber', value: 'cucumber' },
  { caption: 'Grape', value: 'grape' },
  { caption: 'Pear', value: 'pear' },
  { caption: 'Pineapple', value: 'pineapple' },
  { caption: 'Strawberry', value: 'strawberry' },
  { caption: 'Yuzu', value: 'yuzu' },
];

@Injectable({
  providedIn: 'root',
})
export class AutoCompleteService {
  constructor(private readonly httpClient: HttpClient) {}

  search(query: string): Observable<AutoCompleteOption[]> {
    const filtered = DATA.filter(({ caption }) => !query || caption.toLowerCase().includes(query.toLowerCase()));

    return this.httpClient.get<any>('https://jsonplaceholder.typicode.com/todos').pipe(mapTo(filtered));
  }
}
