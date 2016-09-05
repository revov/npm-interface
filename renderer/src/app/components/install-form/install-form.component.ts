import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';

import { InstallInfoModel } from '../../models/install-info.model';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import 'bootstrap/dist/css/bootstrap.css';

@Component({
    selector: 'installForm',
    template: `
        <form class="form-inline" [formGroup]="installForm" (ngSubmit)="handleSubmit()">
            <div class="form-group" [class.has-danger]="!installForm.valid && installForm.dirty">
                <div class="input-group">
                    <input type="text" class="form-control" formControlName="package" placeholder="package name">
                    <div class="input-group-addon">@</div>
                    <input type="text" class="form-control" formControlName="version" placeholder="version">
                </div>
                <div class="form-control-feedback" [hidden]="installForm.valid">{{installForm.errors?.package || installForm.errors?.version}}</div>
            </div>
            <div class="form-check">
                <label class="form-check-label">
                    <input class="form-check-input" formControlName="isDev" type="checkbox"> dev
                </label>
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="!installForm.valid">Install</button>
        </form>
    `
})
export class InstallFormComponent implements OnInit {
    @Input()
    packagePath: string = '';

    @Output()
    installPackage: EventEmitter<InstallInfoModel> = new EventEmitter<InstallInfoModel>();

    installForm: FormGroup;

    constructor(protected fb: FormBuilder, protected projectService: ProjectService) { }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.installForm = this.fb.group({
            'package': ['', Validators.required],
            'version': [''],
            'isDev': [false]
        }, {
            asyncValidator: (group: FormGroup) => {
                return this.projectService.validatePackage(this.packagePath, group.value['package'], group.value['version'])
                    .catch(err => {
                        return Observable.create(observer => {
                            observer.next(err.error);
                            observer.complete();
                        });
                    });
            }
        });
    }
    
    handleSubmit() {
        this.installPackage.emit({
            packageName: this.installForm.value['package'],
            packageVersion: this.installForm.value['version'],
            isDev: this.installForm.value['isDev']
        });
    }
}