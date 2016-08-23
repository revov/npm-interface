import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import PackageMetadataModel from '../../models/package-metadata.model';

import { Subscription } from 'rxjs/Subscription';

@Component({
    // changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div>
            <packageSummary *ngIf="currentPackage != null" [packageMetadata]="currentPackage"></packageSummary>
        </div>
    `,
})
export class PackageInfoComponent implements OnInit, OnDestroy {
    protected currentPackageSubscription: Subscription;
    public currentPackage: PackageMetadataModel;

    asd: string = 'foo';

    constructor(protected projectService: ProjectService, protected ref: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.currentPackageSubscription = this.projectService.currentPackage.subscribe(
            packageMetadata => {
                this.currentPackage = packageMetadata;
                this.ref.markForCheck();
                console.log(packageMetadata);
            }
        );
    }
    
    ngOnDestroy() {
        this.currentPackageSubscription.unsubscribe();
    }
}