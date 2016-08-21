import { Component } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.css';

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
export class AppComponent {
}