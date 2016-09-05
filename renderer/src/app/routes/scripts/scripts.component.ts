import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
    template: `
        <div>
            <div *ngIf="currentPackage == null" class="alert alert-info" role="alert">Please select a project to open (File -> Open)</div>

            <div *ngIf="currentPackage != null">
                <div *ngFor="let script of currentPackage.scripts | keys" class="card-columns">
                    <div class="card card-block">
                        <h4 class="card-title">
                            {{script.key}}
                        </h4>
                        <p class="card-text">
                            <code>
                                {{script.value}}
                            </code>
                        </p>
                        <p *ngIf="runningScripts[script.key]" class="card-text">
                            <xterm [dataStream]="runningScripts[script.key]"></xterm>
                        </p>
                        <runScriptButton [scriptStream]="runningScripts[script.key]" (run)="handleRun(script.key)" (stop)="handleStop(script.key)"></runScriptButton>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .card-columns {
            column-count: 1;
        }
    `]
})
export class ScriptsComponent {
    protected currentPackageSubscription: Subscription;
    currentPackage: any;
    runningScripts: {[s:string]: Observable<string>};
    
    constructor(protected projectService: ProjectService) {

    }

    ngOnInit() {
        this.currentPackageSubscription = this.projectService.currentPackage.subscribe(
            packageInfo => {
                this.currentPackage = packageInfo;

                this.runningScripts = this.projectService.getRunningScripts();
            }
        );
    }
    
    ngOnDestroy() {
        this.currentPackageSubscription.unsubscribe();
    }

    handleRun(script: string) {
        this.runningScripts[script] = this.projectService.runScript(script);
    }

    handleStop(script: string) {
        this.projectService.stopScript(script);
    }
}