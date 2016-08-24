import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.css';
import marked = require('marked');
import { ProjectService } from '../../services/project.service';

@Component({
    selector: 'packageSummary',
    template: `
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-3">{{packageInfo.name}}</h1>
                <p class="lead">{{packageInfo.description}}</p>
                <hr class="m-y-2">
                <p *ngIf="packageInfo.version"><i>Version:</i> {{packageInfo.version}}</p>
                <p *ngIf="packageInfo.author"><i>Author:</i> {{packageInfo.author.name}}</p>
                <p *ngIf="packageInfo.license"><i>License:</i> {{packageInfo.license}}</p>
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
    packageInfo: any;

    constructor(protected projectService: ProjectService) {

    }

    ngOnChanges(changes: SimpleChanges) {
        this.projectService.getReadme(this.packageInfo.path)
            .then(readme => {
                marked.setOptions({sanitize: true});
                this.readmeHtml = marked(readme);
            })
            .catch(error => {
                this.readmeHtml = `<div class="alert alert-warning" role="alert">No Readme found.</div>`;
            });
    }
}