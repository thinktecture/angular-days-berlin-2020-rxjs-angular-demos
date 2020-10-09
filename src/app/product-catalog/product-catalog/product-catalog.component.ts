import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, zip } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Category, CategoryService } from '../category.service';
import { ListViewItem } from '../list-view/list-view.component';
import { Product, ProductService } from '../product.service';

interface ProductDetail extends Product {
  category?: Category;
}

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCatalogComponent implements OnInit {
  categoryList$: Observable<ListViewItem[]>;
  filteredProductList$: Observable<ListViewItem[]>;
  productDetail$: Observable<ProductDetail> | null;

  private readonly selectedCategory$ = new BehaviorSubject<string | null>(null);

  constructor(
    private readonly category: CategoryService,
    private readonly product: ProductService,
  ) {}

  ngOnInit() {
    this.categoryList$ = this.category.list().pipe(shareReplay(1));

    this.filteredProductList$ = combineLatest([this.product.list(), this.selectedCategory$]).pipe(
      map(([products, categoryId]) =>
        products.filter(product => !categoryId || product.categoryId === categoryId),
      ),
      map(products => products.map(({ id, name }) => ({ id, caption: name }))),
    );
  }

  selectCategory(categoryItem?: ListViewItem) {
    this.selectedCategory$.next(categoryItem?.id || null);
  }

  selectProduct(productItem?: ListViewItem) {
    if (!productItem) {
      this.productDetail$ = null;
      return;
    }
    this.productDetail$ = zip(this.product.byId(productItem.id), this.categoryList$).pipe(
      map(([product, categories]) => {
        const category = categories.find(c => c.id === product.categoryId);
        return { ...product, category };
      }),
    );
  }
}
