import { Injectable, NgZone } from '@angular/core';
import { IpcService } from '../../electron-ipc/services/ipc.service';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class ProjectService {
    protected _currentPackageSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
    currentPackage: Observable<any> = this._currentPackageSubject.asObservable();

    constructor(protected ipc: IpcService) {
        this.ipc.on('load-project', this.handleProjectLoaded);
    }

    protected handleProjectLoaded = (event, packageInfo: any) => {
        this._currentPackageSubject.next(packageInfo);
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

    /**
     * Gets the full info for the package and its dependencies. By default depth is -1 which means infinite depth
     */
    getFullInfo(packagePath: string, depth: number = -1) {
        return this.ipc.send('get-full-info', packagePath);
    }
}