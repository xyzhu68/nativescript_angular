import { Utils } from './shared/utils';
import { Component } from '@angular/core';

@Component({
  selector: 'ns-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public get statusbarHeight() { return Utils.statusbarHeight(); }
}
