import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
    template: `
        <div>
            <div *ngIf="currentPackage == null" class="alert alert-info" role="alert">Please select a project to open (File -> Open)</div>
        </div>
    `,
})
export class ScriptsComponent {
    protected currentPackageSubscription: Subscription;
    public currentPackage: any;
    
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