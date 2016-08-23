import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import PackageMetadataModel from '../../models/package-metadata.model';

import { Subscription } from 'rxjs/Subscription';

@Component({
    template: `
        <div>
            <h4 *ngIf="currentPackage == null">Please select a project to open (File -> Open)</h4>
            <packageSummary *ngIf="currentPackage != null" [packageMetadata]="currentPackage"></packageSummary>
        </div>
    `,
})
export class PackageInfoComponent implements OnInit, OnDestroy {
    protected currentPackageSubscription: Subscription;
    public currentPackage: PackageMetadataModel;

    asd: string = 'foo';

    constructor(protected projectService: ProjectService) {

    }

    ngOnInit() {
        this.currentPackageSubscription = this.projectService.currentPackage.subscribe(
            packageMetadata => {
                this.currentPackage = packageMetadata;
                console.log(packageMetadata);
            }
        );
    }
    
    ngOnDestroy() {
        this.currentPackageSubscription.unsubscribe();
    }
}