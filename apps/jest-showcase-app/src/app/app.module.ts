import { EuroPipe, createEuroPipe } from './euro.pipe';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AgeComponent } from './age/age.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { JestShowcaseLibModule } from '@jest-showcase/jest-showcase-lib';
import { PriceComponent } from './price/price.component';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeDe);

@NgModule({
  declarations: [AppComponent, PriceComponent, EuroPipe, AgeComponent],
  imports: [BrowserModule, JestShowcaseLibModule, FormsModule],
  providers: [
    {
      provide: EuroPipe,
      useFactory: createEuroPipe,
      deps: [LOCALE_ID],
    },
    { provide: LOCALE_ID, useValue: 'de-DE' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
