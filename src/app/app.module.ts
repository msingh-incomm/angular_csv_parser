import { BrowserModule} from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {NgxCsvParserModule} from 'ngx-csv-parser';

import { AppComponent} from './app.component';

@NgModule({
  declarations: [
     AppComponent
  ],
  imports: [
     BrowserModule,
     HttpClientModule,
     NgxCsvParserModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
