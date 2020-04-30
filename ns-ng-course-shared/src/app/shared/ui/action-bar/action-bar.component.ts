import { AuthService } from '../../../auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {

    @Input() title: string;
    @Input() hasChallenge = false;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
    }

    onLogout(): void {
        this.authService.logout();
    }
}
