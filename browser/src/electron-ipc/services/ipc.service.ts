import { Injectable, NgZone } from '@angular/core';
import { ipcRenderer } from '@node/electron';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IpcService {
    protected nextId: number = 0;
    protected requests: {[s: string]: Subject<any>} = {};
    protected listeners: {original: any, wrapped: any}[] = [];

    constructor(protected zone: NgZone) {
        // https://github.com/angular/angular/issues/5979
        ipcRenderer.on('__ipcResponse', (event, id: string, returnValue: any) => {
            this.zone.run(() => {
                this.requests[id].next(returnValue);
            });
        });

        ipcRenderer.on('__ipcError', (event, id: string, error: any) => {
            this.zone.run(() => {
                this.requests[id].error(error);
                delete this.requests[id];
            });
        });

        ipcRenderer.on('__ipcComplete', (event, id: string) => {
            this.zone.run(() => {
                this.requests[id].complete();
                delete this.requests[id];
            });
        });
    }

    send(channel:string, ...args: any[]) {
        this.requests[++this.nextId] = new Subject<any>();
        ipcRenderer.send(channel, this.nextId, ...args);

        return this.requests[this.nextId].asObservable();
    }

    on(channel: string, originalListener) {
        const listener = {
            original: originalListener,
            wrapped: (...params) => this.zone.run(() => originalListener(...params))
        };
        this.listeners.push(listener);
        ipcRenderer.on(channel, listener.wrapped);
    }

    removeListener(channel: string, originalListener) {
        for (let index = 0; index < this.listeners.length; index++) {
            var listener = this.listeners[index];

            if(listener.original === originalListener) {
                ipcRenderer.removeListener(channel, listener.wrapped);
                this.listeners.splice(index, 1);
                break;
            }
        }
    }
}