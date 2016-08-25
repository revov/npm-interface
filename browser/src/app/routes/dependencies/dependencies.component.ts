import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../../services/project.service';

import { Subscription } from 'rxjs/Subscription';
import InstallInfoModel from '../../models/install-info.model';

import { remote } from '@node/electron';

@Component({
    template: `
        <div>
            <div *ngIf="currentPackage == null" class="alert alert-info" role="alert">Please select a project to open (File -> Open)</div>
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
                            (onUpdate)="handlePackageUpdate($event)"
                        ></packageSummary>
                    </template>
                </ngb-panel>
            </ngb-accordion>
        </div>
    `,
})
export class DependenciesComponent {
    protected currentPackageSubscription: Subscription;
    protected outdatedPackagesSubscription: Subscription;
    public currentPackage: any;
    public outdatedPackages: any;

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

    handlePackageUpdate(dependency: InstallInfoModel) {
        this.projectService.install(
            this.currentPackage.path,
            `${dependency.packageName}@${dependency.packageVersion}`,
            this.currentPackage.devDependencies[dependency.packageName] ? true : false
        )
            .then(() => {
                this.projectService.load(this.currentPackage.path);
            })
            .catch(err => {
                remote.dialog.showErrorBox('There was an error updating the package:', err);
                this.projectService.load(this.currentPackage.path);
            });
    }
}