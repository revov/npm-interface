import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PackageSummaryComponent } from './components/package-summary/package-summary.component';
import { LoadingMaskComponent } from './components/loading-mask/loading-mask.component';
import { PackagesPerLicenseComponent } from './components/packages-per-license/packages-per-license.component';
import { InstallFormComponent } from './components/install-form/install-form.component';

import { PackageInfoComponent } from './routes/package-info/package-info.component';
import { DependenciesComponent } from './routes/dependencies/dependencies.component';
import { LicensesComponent }    from './routes/licenses/licenses.component';
import { ScriptsComponent } from './routes/scripts/scripts.component';
import { RunScriptButtonComponent } from './routes/scripts/run-script-button.component';

import { ProjectService } from './services/project.service';
import { IsLoadingService } from './services/is-loading.service';

import { KeysPipe } from './pipes/keys.pipe';

import { ElectronIpcModule } from '../electron-ipc/electron-ipc.module';
import { XtermModule } from '../xterm/xterm.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing, appRoutingProviders } from './routes';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        ElectronIpcModule.forRoot(),
        NgbModule,
        XtermModule
    ],
    declarations: [
        AppComponent,
        SidebarComponent,
        PackageInfoComponent,
        DependenciesComponent,
        LicensesComponent,
        ScriptsComponent,
        PackageSummaryComponent,
        KeysPipe,
        LoadingMaskComponent,
        PackagesPerLicenseComponent,
        InstallFormComponent,
        RunScriptButtonComponent
    ],
    providers: [
        appRoutingProviders,
        ProjectService,
        Title,
        IsLoadingService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }