import { NgModule, ModuleWithProviders  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IpcService } from './services/ipc.service';

@NgModule({
    imports:      [ BrowserModule ]
})
export class ElectronIpcModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ElectronIpcModule,
            providers: [ IpcService ]
        };
    }
}