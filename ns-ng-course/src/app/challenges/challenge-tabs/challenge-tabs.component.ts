import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ns-challenge-tabs',
  templateUrl: './challenge-tabs.component.html',
  styleUrls: ['./challenge-tabs.component.css']
})
export class ChallengeTabsComponent implements OnInit {

    constructor(private router: RouterExtensions, private active: ActivatedRoute, private page: Page) { }

    ngOnInit(): void {
        this.router.navigate(
            [{outlets: {currentChallenge: ['current-challenge'], today: ['today']}}],
            { relativeTo: this.active}
        );
        this.page.actionBarHidden = true;
    }

}
