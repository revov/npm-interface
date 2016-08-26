/// <reference path="../../typings/xterm.d.ts" />
import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy, ElementRef, Input, ChangeDetectionStrategy } from '@angular/core';
import Terminal = require('xterm');
import 'xterm/addons/fit/fit.js';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'xterm',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div (window:resize)="handleResize()">
        </div>
    `
})
export class XtermComponent implements OnInit, OnChanges, OnDestroy {
    term: Terminal;

    @Input()
    dataStream: Observable<string>;
    protected dataStreamSubscription: Subscription;

    constructor(protected elementRef: ElementRef) {

    }

    ngOnInit() {
        this.term = new Terminal();
        const containerEl = this.elementRef.nativeElement.children[0];
        this.term.open(containerEl);
        this.term.fit();
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes['dataStream'] && changes['dataStream'].currentValue) {
            if(this.dataStreamSubscription) {
                this.dataStreamSubscription.unsubscribe();
            }
            this.dataStreamSubscription = this.dataStream.subscribe(data => {
                this.term.write(data.replace(/\n/g, '\n\r'));
            });
        }
    }

    ngOnDestroy() {
        if(this.dataStreamSubscription) {
            this.dataStreamSubscription.unsubscribe();
        }
        this.term.destroy();
    }

    handleResize() {
        this.term.fit();
    }
}