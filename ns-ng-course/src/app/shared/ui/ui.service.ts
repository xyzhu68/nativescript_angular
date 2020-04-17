import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UIService {
    private _drawerState = new Subject();
    private _rootVcRef: ViewContainerRef;

    get drawerState() {
        return this._drawerState.asObservable();
    }

    toggleDrawer() {
        this._drawerState.next();
    }

    setRootVCRef(vcRef: ViewContainerRef) {
        this._rootVcRef = vcRef;
    }

    getRootVCRef() {
        return this._rootVcRef;
    }
}
