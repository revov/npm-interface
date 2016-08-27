import { Component, OnDestroy } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.css';

import { IsLoadingService } from './services/is-loading.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'application',
    template: `
        <div class="wrapper">
            <sidebar>
                <a href="javascript:void(0)" class="nav-link" [routerLink]="['/package-info']" routerLinkActive="active">
                    package.json
                </a>
                <a href="javascript:void(0)" class="nav-link" [routerLink]="['/dependencies']" routerLinkActive="active">Dependencies</a>
                <a href="javascript:void(0)" class="nav-link" [routerLink]="['/scripts']" routerLinkActive="active">Scripts</a>
            </sidebar>

            <div class="container-fluid page-content-wrapper">
                <router-outlet></router-outlet>
                <loadingMask [show]="isLoading"></loadingMask>
            </div>
        </div>
    `,
    styles: [`
        .wrapper {
            padding-left:200px;
            margin:0;
        }
    `,
    `
        .nav-link {
            border-radius: 0rem;
        }
    `,
    `
        .page-content-wrapper {
            padding: 1rem;
        }

    `]
})
export class AppComponent implements OnDestroy {
    protected _isLoadingSubscription: Subscription;

    isLoading: boolean = false;

    constructor(protected isLoadingService: IsLoadingService) {
        this._isLoadingSubscription = isLoadingService.isLoading.subscribe(isLoading => this.isLoading = isLoading);
    }

    ngOnDestroy() {
        this._isLoadingSubscription.unsubscribe();
    }
}