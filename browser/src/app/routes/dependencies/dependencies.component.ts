import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../../services/project.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
    template: `
        <div>
            <h4 *ngIf="currentPackage == null">Please select a project to open (File -> Open)</h4>
            <ngb-accordion *ngIf="currentPackage" activeIds="ngb-panel-0" [closeOthers]="true">
                <ngb-panel *ngFor="let dep of currentPackage.dependencies | keys">
                    <template ngbPanelTitle>
                        <span [hidden]="!currentPackage.devDependencies[dep.key]" class="tag tag-default tag-pill pull-xs-right">dev</span>
                        {{dep.value.name}}
                    </template>
                    <template ngbPanelContent>
                        <packageSummary [packageInfo]="dep.value"></packageSummary>
                    </template>
                </ngb-panel>
            </ngb-accordion>
        </div>
    `,
})
export class DependenciesComponent {
    protected currentPackageSubscription: Subscription;
    public currentPackage: any;

    asd: string = 'foo';

    constructor(protected projectService: ProjectService) {

    }

    ngOnInit() {
        this.currentPackageSubscription = this.projectService.currentPackage.subscribe(
            packageInfo => {
                this.currentPackage = packageInfo;
            }
        );
    }
    
    ngOnDestroy() {
        this.currentPackageSubscription.unsubscribe();
    }
}