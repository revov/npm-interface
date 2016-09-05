import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../../services/project.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
    template: `
        <div>
            <div *ngIf="currentPackage == null" class="alert alert-info" role="alert">Please select a project to open (File -> Open)</div>
            <packageSummary *ngIf="currentPackage != null" [packageInfo]="currentPackage"></packageSummary>
        </div>
    `,
})
export class PackageInfoComponent implements OnInit, OnDestroy {
    protected currentPackageSubscription: Subscription;
    public currentPackage: any;

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