import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../../services/project.service';

import { Subscription } from 'rxjs/Subscription';

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
                            (onUpdate)="handlePackageUpdate(dep.key)"
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

    handlePackageUpdate(dependency: string) {
        console.log(`Updating ${dependency}`);
    }
}