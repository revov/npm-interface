import { Injectable, NgZone } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class IsLoadingService {
    protected _isLoadingSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    isLoading: Observable<boolean> = this._isLoadingSubject.asObservable();

    protected _id: number = 0;
    protected _loadingIds:number[] = [];

    constructor() {
        this._isLoadingSubject.next(false);
    }

    startLoading(): number {
        const nextId = ++this._id;
        this._loadingIds.push(nextId);
        this._isLoadingSubject.next(true);

        return nextId;
    }

    completeLoading(startLoadingId: number) {
        this._loadingIds = this._loadingIds.filter(element => element !== startLoadingId);
        if(this._loadingIds.length === 0) {
            this._isLoadingSubject.next(false);
        }
    }

}