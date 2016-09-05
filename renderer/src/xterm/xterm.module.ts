import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { XtermComponent } from './components/xterm.component';

@NgModule({
    imports: [ BrowserModule ],
    declarations: [ XtermComponent ],
    exports: [ XtermComponent ]
})
export class XtermModule {
}