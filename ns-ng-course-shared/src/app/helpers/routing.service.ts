import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class RoutingService {

    constructor(private router: Router) {}
    replace(commands: any[]) {
        this.router.navigate(commands, {replaceUrl: true});
    }
}
