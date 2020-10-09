import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export interface ListViewItem {
  id: string;
  caption: string;
}

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent {
  @Input() items: ListViewItem[] = [];
  @Output() choose = new EventEmitter<ListViewItem | undefined>();

  selectedItem?: ListViewItem;

  select(item: ListViewItem) {
    this.selectedItem = this.selectedItem === item ? undefined : item;
    this.choose.emit(this.selectedItem);
  }
}
