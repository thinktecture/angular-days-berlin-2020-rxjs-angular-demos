import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutoCompleteModule } from './auto-complete/auto-complete.module';
import { LogModule } from './log/log.module';
import { ProductCatalogModule } from './product-catalog/product-catalog.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule,
    AutoCompleteModule,
    LogModule,
    ProductCatalogModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
