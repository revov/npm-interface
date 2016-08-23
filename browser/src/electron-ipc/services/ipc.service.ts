import { Injectable, NgZone } from '@angular/core';
import { ipcRenderer } from '@node/electron';

@Injectable()
export class IpcService {
    protected nextId: number = 0;
    protected requests: {[s: string]: {resolve: any, reject: any}} = {};
    protected listeners: {original: any, wrapped: any}[] = [];

    constructor(protected zone: NgZone) {
        ipcRenderer.on('__ipcResponse', (event, id: string, error: any, returnValue: any) => {
            // https://github.com/angular/angular/issues/5979
            this.zone.run(() => {
                if(error) {
                    this.requests[id].reject(error);
                } else {
                    this.requests[id].resolve(returnValue);
                }

                delete this.requests[id];
            });
        });
    }

    send(channel:string, ...args: any[]) {
        return new Promise((resolve, reject) => {
            this.requests[++this.nextId] = {resolve, reject};
            ipcRenderer.send(channel, this.nextId, ...args);
        });
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