import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule }   from '@angular/common';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PackageInfoComponent }    from './package-info/package-info.component';
import { DependenciesComponent }    from './dependencies/dependencies.component';
import { ScriptsComponent }    from './scripts/scripts.component';

// import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap/popover/index';
import { FormsModule } from '@angular/forms';

import { routing, appRoutingProviders } from './routes';

@NgModule({
    imports:      [ BrowserModule, CommonModule, routing, FormsModule ],
    declarations: [ AppComponent, SidebarComponent, PackageInfoComponent, DependenciesComponent, ScriptsComponent ],
    providers:    [ appRoutingProviders ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }