import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
                <p *ngIf="packageInfo.version">Version: <i>{{packageInfo.version}}</i></p>
                <p *ngIf="packageInfo.author">Author: <i>{{packageInfo.author.name}}</i></p>
                <p *ngIf="packageInfo.license">License: <i>{{packageInfo.license}}</i></p>
            </div>
        </div>
        <div *ngIf="outdatedInfo" class="card card-block card-success card-inverse">
            <h4 class="card-title">Update available</h4>
            <p class="card-text">Current: <span class="tag tag-default">{{outdatedInfo.current}}</span></p>
            <p class="card-text">Wanted: <span class="tag tag-info">{{outdatedInfo.wanted}}</span></p>
            <p class="card-text">Latest: <span class="tag tag-warning">{{outdatedInfo.latest}}</span></p>


            <a href="javascript:void(0)" (click)="onUpdate.next()" class="btn btn-warning">Update to {{outdatedInfo.latest}}</a>
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

    @Input()
    outdatedInfo: {
        current: string,
        wanted: string,
        latest: string,
        location: string
    };

    @Output()
    onUpdate = new EventEmitter<any>();


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