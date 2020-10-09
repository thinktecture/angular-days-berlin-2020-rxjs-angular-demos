import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, switchMap, startWith } from 'rxjs/operators';
import { AutoCompleteOption, AutoCompleteService } from '../auto-complete.service';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
})
export class AutoCompleteComponent implements OnInit {
  readonly search = new FormControl('');

  options$: Observable<AutoCompleteOption[]>;

  constructor(private readonly autoComplete: AutoCompleteService) {}

  ngOnInit(): void {
    this.options$ = this.search.valueChanges.pipe(
      startWith(''),
      debounceTime(250),
      switchMap(query => this.autoComplete.search(query)),
    );
  }
}
