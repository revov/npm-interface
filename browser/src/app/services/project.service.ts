import { Injectable, NgZone } from '@angular/core';
import { ipcRenderer } from '@node/electron';
import PackageMetadataModel from '../models/package-metadata.model';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class ProjectService {
    protected _currentPackageSubject: ReplaySubject<PackageMetadataModel> = new ReplaySubject<PackageMetadataModel>(1);
    currentPackage: Observable<PackageMetadataModel> = this._currentPackageSubject.asObservable();

    constructor(protected zone: NgZone) {
        ipcRenderer.on('load-project', this.handleProjectLoaded);
    }

    protected handleProjectLoaded = (event, packageMetadata: PackageMetadataModel) => {
        // https://github.com/angular/angular/issues/5979
        this.zone.run(
            () => this._currentPackageSubject.next(packageMetadata)
        );
    }

    /**
     * This should potentially never be called in the lifetime of the application
     */
    destroy() {
        ipcRenderer.removeListener('load-project', this.handleProjectLoaded);
    }
}