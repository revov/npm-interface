import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.css';
import marked = require('marked');
import { ProjectService } from '../../services/project.service';
import { InstallInfoModel } from '../../models/install-info.model';

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
                <p *ngIf="packageInfo.keywords">Keywords: <i>{{packageInfo.keywords.join(', ')}}</i></p>
            </div>
        </div>
        <div *ngIf="outdatedInfo" class="card card-block card-success card-inverse">
            <h4 class="card-title">Update available</h4>
            <p class="card-text">Current: <span class="tag tag-default">{{outdatedInfo.current}}</span></p>
            <p class="card-text">Wanted: <span class="tag tag-info">{{outdatedInfo.wanted}}</span></p>
            <p class="card-text">Latest: <span class="tag tag-warning">{{outdatedInfo.latest}}</span></p>

            <button (click)="handleUpdate()" class="btn btn-warning" [disabled]="isUpdating">Update to {{outdatedInfo.latest}}</button>
        </div>
        <div [innerHtml]="readmeHtml"></div>
    `,
    styles: [`
    `]
})
export class PackageSummaryComponent implements OnChanges {
    readmeHtml: string = '';
    isUpdating: boolean = false;

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
    onUpdate = new EventEmitter<InstallInfoModel>();


    constructor(protected projectService: ProjectService) {

    }

    ngOnChanges(changes: SimpleChanges) {
        this.projectService.getReadme(this.packageInfo.path)
            .subscribe(
                readme => {
                    marked.setOptions({sanitize: true});
                    this.readmeHtml = marked(readme);
                },
                error => {
                    this.readmeHtml = `<div class="alert alert-warning" role="alert">No Readme found.</div>`;
                }
            );
    }

    handleUpdate() {
        this.isUpdating=true;
        this.onUpdate.next({
            packageName: this.packageInfo.name,
            packageVersion: this.outdatedInfo.latest
        });
    }
}