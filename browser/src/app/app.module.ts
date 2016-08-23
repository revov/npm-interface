import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule }   from '@angular/common';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PackageSummaryComponent } from './components/package-summary/package-summary.component';

import { PackageInfoComponent }    from './routes/package-info/package-info.component';
import { DependenciesComponent }    from './routes/dependencies/dependencies.component';
import { ScriptsComponent }    from './routes/scripts/scripts.component';

import { ProjectService }    from './services/project.service';
import { ElectronIpcModule } from '../electron-ipc/electron-ipc.module';

// import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap/popover/index';
import { FormsModule } from '@angular/forms';

import { routing, appRoutingProviders } from './routes';

@NgModule({
    imports:      [ BrowserModule, CommonModule, routing, FormsModule, ElectronIpcModule.forRoot() ],
    declarations: [ AppComponent, SidebarComponent, PackageInfoComponent, DependenciesComponent, ScriptsComponent, PackageSummaryComponent ],
    providers:    [ appRoutingProviders, ProjectService ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }