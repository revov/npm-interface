import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../../services/project.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { InstallInfoModel } from '../../models/install-info.model';

import { remote } from '@node/electron';

@Component({
    template: `
        <div>
            <div *ngIf="currentPackage == null" class="alert alert-info" role="alert">Please select a project to open (File -> Open)</div>
            
            <div class="container">

                <div *ngIf="currentPackage" class="m-y-2">
                    <installForm [packagePath]="currentPackage.path" (installPackage)="handlePackageInstall($event)"></installForm>
                </div>

                <ngb-accordion *ngIf="currentPackage" activeIds="ngb-panel-0" [closeOthers]="true">
                    <ngb-panel *ngFor="let dep of currentPackage.dependencies | keys">
                        <template ngbPanelTitle>
                            <span [hidden]="!currentPackage.devDependencies[dep.key]" class="tag tag-default tag-pill pull-xs-right">dev</span>
                            <span
                                [hidden]="!outdatedPackages || (outdatedPackages && !outdatedPackages[dep.key])"
                                class="tag tag-danger tag-pill pull-xs-right"
                            >update available</span>
                            {{dep.value.name}}
                        </template>
                        <template ngbPanelContent>
                            <packageSummary
                                [packageInfo]="dep.value"
                                [outdatedInfo]="outdatedPackages ? outdatedPackages[dep.key] : null"
                                (onUpdate)="handlePackageInstall($event, true)"
                            ></packageSummary>
                        </template>
                    </ngb-panel>
                </ngb-accordion>
            </div>

            <div *ngIf="showXterm" class="modal fade in" data-backdrop="true" tabindex="-1" style="display: block">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-body">
                            <xterm [dataStream]="xtermStream"></xterm>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" [disabled]="isBusyExecutingACommand" (click)="showXterm = false">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
            <div *ngIf="showXterm" class="modal-backdrop fade in"></div>
        </div>
    `
})
export class DependenciesComponent {
    protected currentPackageSubscription: Subscription;
    protected outdatedPackagesSubscription: Subscription;
    public currentPackage: any;
    public outdatedPackages: any;

    showXterm: boolean = false;
    isBusyExecutingACommand: boolean = false;
    xtermStream: Observable<string>;

    constructor(protected projectService: ProjectService) {

    }

    ngOnInit() {
        this.currentPackageSubscription = this.projectService.currentPackage.subscribe(
            packageInfo => {
                this.currentPackage = packageInfo;
            }
        );

        this.outdatedPackagesSubscription = this.projectService.outdatedPackages.subscribe(
            outdatedPackages => {
                this.outdatedPackages = outdatedPackages;
            }
        );
    }
    
    ngOnDestroy() {
        this.currentPackageSubscription.unsubscribe();
        this.outdatedPackagesSubscription.unsubscribe();
    }

    handlePackageInstall(packageInfo: InstallInfoModel, isUpdate: boolean = false) {
        const packageIdentifier: string =
            packageInfo.packageVersion == '' ?
            `${packageInfo.packageName}` :
            `${packageInfo.packageName}@${packageInfo.packageVersion}`
        
        const isDev: boolean =
            isUpdate ?
            (this.currentPackage.devDependencies[packageInfo.packageName] ? true : false) :
            packageInfo.isDev;

        this.xtermStream = this.projectService.install(this.currentPackage.path, packageIdentifier, isDev);

        this.xtermStream
            .subscribe(
                line => {},
                err => {
                    remote.dialog.showErrorBox('There was an error installing the package.', `npm exit code: ${err}`);
                    this.projectService.load(this.currentPackage.path);
                    this.isBusyExecutingACommand = false;
                },
                () => {
                    this.projectService.load(this.currentPackage.path);
                    this.isBusyExecutingACommand = false;
                }
            );

        this.showXterm = true;
        this.isBusyExecutingACommand = true;
    }
}