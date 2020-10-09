import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesListComponent {
  public readonly favorites$ = this.itemsService.favorites$;

  constructor(private readonly itemsService: ItemsService) {}
}
