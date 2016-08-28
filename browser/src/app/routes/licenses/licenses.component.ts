import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { IsLoadingService } from '../../services/is-loading.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
    template: `
        <div>
            <div *ngIf="currentPackage == null" class="alert alert-info" role="alert">Please select a project to open (File -> Open)</div>
            <table *ngIf="shouldShowResultsTable()" class="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>License</th>
                        <th>Number of packages</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let license of packagesByLicense | keys">
                        <td>{{license.key}}</td>
                        <td>
                            <a
                                href="javascript:void(0)"
                                *ngIf="expandedPackagesForLicense != license.key"
                                (click)="expandedPackagesForLicense = license.key"
                            >
                                {{license.value.length}}
                            </a>
                            <packagesPerLicense
                                *ngIf="expandedPackagesForLicense == license.key"
                                [packages]="license.value"
                            >
                            </packagesPerLicense>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
})
export class LicensesComponent {
    protected currentPackageSubscription: Subscription;
    currentPackage: any;

    packagesByLicense: {} = {};
    expandedPackagesForLicense: string = '';
    
    constructor(protected projectService: ProjectService, protected isLoadingService: IsLoadingService) {

    }

    ngOnInit() {
        this.currentPackageSubscription = this.projectService.currentPackage.subscribe(
            packageInfo => {
                this.currentPackage = packageInfo;

                const loadingId: number = this.isLoadingService.startLoading();

                this.projectService.getLicenses(packageInfo.path).subscribe(
                    packages => {
                        this.packagesByLicense = {};

                        for(const key in packages) {
                            const licenseInfo = packages[key];
                            this.packagesByLicense[licenseInfo.licenses] = this.packagesByLicense[licenseInfo.licenses] || [];
                            this.packagesByLicense[licenseInfo.licenses].push( Object.assign({}, licenseInfo, {name: key}) );
                        }

                        console.log(this.packagesByLicense);
                        this.isLoadingService.completeLoading(loadingId);
                    },
                    err => console.error(err)
                );
            }
        );
    }
    
    ngOnDestroy() {
        this.currentPackageSubscription.unsubscribe();
    }

    shouldShowResultsTable() {
        return this.currentPackage != null && Object.keys(this.packagesByLicense).length !== 0;
    }
}