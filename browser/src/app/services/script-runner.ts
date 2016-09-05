import { Injectable, NgZone } from '@angular/core';

import { IpcService } from '../../electron-ipc/services/ipc.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export class ScriptRunner {
    protected runningScripts: {[s:string]: {replaySubject: ReplaySubject<string>, subscription: Subscription}} = {};

    constructor(protected ipc: IpcService, protected packagePath: string) {

    }

    runScript(script: string): Observable<string> {
        if(!this.runningScripts[script]) {
            const scriptObservable = this.ipc.send('run-script', this.packagePath, script);
            this.runningScripts[script] = {
                replaySubject: new ReplaySubject<string>(64),
                subscription: scriptObservable.subscribe(
                    line => this.runningScripts[script].replaySubject.next(line),
                    error => {
                        this.runningScripts[script].replaySubject.error(error);
                        delete this.runningScripts[script];
                    },
                    () => {
                        this.runningScripts[script].replaySubject.complete();
                        delete this.runningScripts[script];
                    }
                )
            };
        }

        return this.runningScripts[script].replaySubject.asObservable();
    }

    stopScript(script: string) {
        this.ipc.send('stop-script', this.packagePath, script);
    }

    getRunningScripts(): {[s:string]: Observable<string>} {
        let runningScripts: {[s:string]: Observable<string>} = {};
        for(let script in this.runningScripts) {
            runningScripts[script] = this.runningScripts[script].replaySubject.asObservable();
        }

        return runningScripts;
    }

    destroy() {
        for(let script in this.runningScripts) {
            this.stopScript(script);
        }
    }
}