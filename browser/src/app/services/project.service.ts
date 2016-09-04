import { Injectable, NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IpcService } from '../../electron-ipc/services/ipc.service';
import { remote } from '@node/electron';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { IsLoadingService } from './is-loading.service';

@Injectable()
export class ProjectService {
    protected _currentPackageSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
    currentPackage: Observable<any> = this._currentPackageSubject.asObservable();

    protected _outdatedPackagesSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
    outdatedPackages: Observable<any> = this._outdatedPackagesSubject.asObservable();

    constructor(protected ipc: IpcService, protected titleService: Title, protected isLoadingService: IsLoadingService) {
        this.ipc.on('load-project', this.handleProjectLoaded);

        this._currentPackageSubject.subscribe(packageInfo => {
            console.log(packageInfo);
            this.titleService.setTitle(packageInfo.name);
        });
    }

    protected handleProjectLoaded = (event, packagePath: string) => {
        const fullInfoLoadingId = this.isLoadingService.startLoading();
        this.getFullInfo(packagePath)
            .subscribe(
                packageInfo => this._currentPackageSubject.next(packageInfo),
                err => {
                    this.isLoadingService.completeLoading(fullInfoLoadingId);
                    remote.dialog.showErrorBox('Invalid package directory', err);
                },
                () => this.isLoadingService.completeLoading(fullInfoLoadingId)
            );

        const outdatedLoadingId = this.isLoadingService.startLoading();
        this.getOutdated(packagePath)
            .subscribe(
                outdatedPackages => this._outdatedPackagesSubject.next(outdatedPackages),
                err => {
                    this.isLoadingService.completeLoading(outdatedLoadingId);
                    remote.dialog.showErrorBox('Could not obtain a list of outdated packages', err);
                },
                () => this.isLoadingService.completeLoading(outdatedLoadingId)
            );
    }

    /**
     * This should potentially never be called in the lifetime of the application
     */
    destroy() {
        this.ipc.removeListener('load-project', this.handleProjectLoaded);
        this._currentPackageSubject.complete();
        this._outdatedPackagesSubject.complete();
    }

    /**
     * Load/reload a package at path
     */
    load(packagePath: string) {
        this.handleProjectLoaded(null, packagePath);
    }

    /**
     * Get the readme for a package
     */
    getReadme(packagePath: string) {
        return this.ipc.send('get-readme', packagePath);
    }

    /**
     * Gets the full info for the package and its dependencies. By default depth is -1 which means infinite depth
     */
    getFullInfo(packagePath: string, depth: number = -1) {
        return this.ipc.send('get-full-info', packagePath);
    }

    /**
     * Get a hash of the outdated packages
     */
    getOutdated(packagePath: string) {
        return this.ipc.send('get-outdated', packagePath);
    }

    install(packagePath: string, packageToInstall:string, isDev: boolean = false) {
        return this.ipc.send('install', packagePath, packageToInstall, isDev);
    }

    getLicenses(packagePath: string) {
        return this.ipc.send('get-licenses', packagePath);
    }

    validatePackage(packagePath: string, packageToValidate: string, version: string) {
        return this.ipc.send('validate-package', packagePath, packageToValidate, version);
    }
}