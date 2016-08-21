import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap/popover/index';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports:      [ BrowserModule, FormsModule, NgbPopoverModule ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }