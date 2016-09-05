import { Component, Input, Output, OnChanges, OnDestroy, SimpleChanges, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import 'bootstrap/dist/css/bootstrap.css';

@Component({
    selector: 'runScriptButton',
    template: `
        <button [hidden]="isRunning" class="btn btn-success" (click)="run.next(true)">Run</button>
        <button [hidden]="!isRunning" class="btn btn-danger" (click)="stop.next(true)">Stop</button>
    `
})
export class RunScriptButtonComponent implements OnChanges, OnDestroy {
    @Input()
    scriptStream: Observable<string>;

    @Output()
    run: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    stop: EventEmitter<any> = new EventEmitter<any>();

    protected scriptStreamSubscription: Subscription;

    isRunning: boolean = false;

    ngOnChanges(changes: SimpleChanges) {
        if(changes['scriptStream']) {
            this.safeUnsubscribe();

            if(changes['scriptStream'].currentValue) {
                this.isRunning = true;
                
                this.scriptStreamSubscription = changes['scriptStream'].currentValue.subscribe(
                    () => {},
                    err => this.isRunning = false,
                    () => this.isRunning = false
                );
            }
        }
    }

    ngOnDestroy() {
        this.safeUnsubscribe();
    }

    protected safeUnsubscribe() {
        if(this.scriptStreamSubscription) {
            this.scriptStreamSubscription.unsubscribe();
        }
        this.scriptStreamSubscription = null;
        this.isRunning = false;
    }
}