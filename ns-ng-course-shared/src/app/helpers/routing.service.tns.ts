import { RouterExtensions } from 'nativescript-angular/router';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class RoutingService {

    constructor(private router: RouterExtensions) {}
    replace(commands: any[]) {
        this.router.navigate(commands, {clearHistory: true});
    }
}
