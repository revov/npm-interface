import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.css';
import PackageMetadataModel from '../../models/package-metadata.model';
import marked = require('marked');
import { ProjectService } from '../../services/project.service';

@Component({
    selector: 'packageSummary',
    template: `
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-3">{{packageMetadata.packageJson.name}}</h1>
                <p class="lead">{{packageMetadata.packageJson.description}}</p>
                <hr class="m-y-2">
                <p>{{packageMetadata.packageJson.version}}</p>
            </div>
        </div>
        <div [innerHtml]="readmeHtml"></div>
    `,
    styles: [`
    `]
})
export class PackageSummaryComponent implements OnChanges {
    readmeHtml: string = '';

    @Input()
    packageMetadata: PackageMetadataModel;

    constructor(protected projectService: ProjectService) {

    }

    ngOnChanges(changes: SimpleChanges) {
        this.projectService.getReadme(this.packageMetadata.path)
            .then(readme => {
                marked.setOptions({sanitize: true});
                this.readmeHtml = marked(readme);
            })
            .catch(error => {
                this.readmeHtml = `<div class="alert alert-warning" role="alert">No Readme found.</div>`;
            });
    }
}