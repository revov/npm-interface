import { Component, Input } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.css';

@Component({
    selector: 'packagesPerLicense',
    template: `
        <ul class="list-group">
            <li *ngFor="let package of packages" class="list-group-item">
                <a href="{{package.repository}}">{{package.name}}</a>
            </li>
        </ul>
    `
})
export class PackagesPerLicenseComponent {
    @Input()
    packages: any[];
}