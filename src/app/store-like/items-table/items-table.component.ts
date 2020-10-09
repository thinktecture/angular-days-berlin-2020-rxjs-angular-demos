import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsTableComponent {
  public items$ = this.itemsService.items$;

  constructor(private readonly itemsService: ItemsService) {}

  public toggleFavorite(id: number): void {
    this.itemsService.toggleFavorite(id).subscribe();
  }
}
