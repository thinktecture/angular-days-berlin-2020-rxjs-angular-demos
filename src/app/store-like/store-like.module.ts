import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ItemsTableComponent } from './items-table/items-table.component';
import { ItemsService } from './items.service';
import { StoreLikeRoutingModule } from './store-like-routing.module';

@NgModule({
  declarations: [FavoritesListComponent, FavoritesComponent, ItemsTableComponent],
  imports: [CommonModule, StoreLikeRoutingModule, MatIconModule],
  exports: [],
})
export class StoreLikeModule {
  constructor(private readonly itemsService: ItemsService) {
    this.itemsService.start();
  }
}
