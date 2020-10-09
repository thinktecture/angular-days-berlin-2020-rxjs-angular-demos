import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

export interface ProductPreview {
  id: string;
  name: string;

  categoryId: string;
}
export interface Product extends ProductPreview {
  description: string;
}

const PRODUCTS: Product[] = [
  { id: 'apple', name: 'Apple', description: '', categoryId: 'fruit' },
  { id: 'pants', name: 'Pants', description: '', categoryId: 'clothing' },
  { id: 'pear', name: 'Pear', description: '', categoryId: 'fruit' },
  { id: 'shirt', name: 'Shirt', description: '', categoryId: 'clothing' },
  { id: 'carrot', name: 'Carrot', description: '', categoryId: 'vegetable' },
  { id: 'banana', name: 'Banana', description: '', categoryId: 'fruit' },
];

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  list(): Observable<ProductPreview[]> {
    const previews = PRODUCTS.map(({ description, ...preview }) => preview);
    return of(previews);
  }

  byId(id: string): Observable<Product> {
    const foundProduct = PRODUCTS.find(product => product.id === id);
    return foundProduct ? of(foundProduct) : throwError(`No product with id ${id} found.`);
  }

  byCategory(categoryId: string): Observable<Product[]> {
    const filtered = PRODUCTS.filter(product => product.categoryId === categoryId);
    return of(filtered);
  }
}
