import { Component, Input } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.css';
import PackageMetadataModel from '../../models/package-metadata.model';

@Component({
    selector: 'packageSummary',
    template: `
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-3">{{packageMetadata.packageJson.name}}</h1>
                <p class="lead">{{packageMetadata.packageJson.description}}</p>
            </div>
        </div>
    `,
    styles: [`
    `]
})
export class PackageSummaryComponent {
    @Input()
    packageMetadata: PackageMetadataModel;
}