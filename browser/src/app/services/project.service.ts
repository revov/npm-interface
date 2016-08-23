import { Injectable, NgZone } from '@angular/core';
import PackageMetadataModel from '../models/package-metadata.model';
import { IpcService } from '../../electron-ipc/services/ipc.service';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class ProjectService {
    protected _currentPackageSubject: ReplaySubject<PackageMetadataModel> = new ReplaySubject<PackageMetadataModel>(1);
    currentPackage: Observable<PackageMetadataModel> = this._currentPackageSubject.asObservable();

    constructor(protected ipc: IpcService) {
        this.ipc.on('load-project', this.handleProjectLoaded);
    }

    protected handleProjectLoaded = (event, packageMetadata: PackageMetadataModel) => {
        this._currentPackageSubject.next(packageMetadata);
    }

    /**
     * This should potentially never be called in the lifetime of the application
     */
    destroy() {
        this.ipc.removeListener('load-project', this.handleProjectLoaded);
    }

    getReadme(packagePath: string) {
        return this.ipc.send('get-readme', packagePath);
    }
}