import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../../services/project.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
    template: `
        <div>
            <h4 *ngIf="currentPackage == null">Please select a project to open (File -> Open)</h4>
            <packageSummary *ngIf="currentPackage != null" [packageInfo]="currentPackage"></packageSummary>
        </div>
    `,
})
export class PackageInfoComponent implements OnInit, OnDestroy {
    protected currentPackageSubscription: Subscription;
    public currentPackage: any;

    asd: string = 'foo';

    constructor(protected projectService: ProjectService) {

    }

    ngOnInit() {
        this.currentPackageSubscription = this.projectService.currentPackage.subscribe(
            packageInfo => {
                this.currentPackage = packageInfo;
                console.log(packageInfo);
            }
        );
    }
    
    ngOnDestroy() {
        this.currentPackageSubscription.unsubscribe();
    }
}