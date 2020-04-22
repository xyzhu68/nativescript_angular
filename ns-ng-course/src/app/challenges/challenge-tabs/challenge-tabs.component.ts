import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BottomNavigation } from 'tns-core-modules/ui/bottom-navigation';
import { isAndroid } from "tns-core-modules/platform";

@Component({
  selector: 'ns-challenge-tabs',
  templateUrl: './challenge-tabs.component.html',
  styleUrls: ['./challenge-tabs.component.css']
})
export class ChallengeTabsComponent implements OnInit {
    @ViewChild('bottomNavEl', {static: false}) bottomNavEl : ElementRef<BottomNavigation>;
    constructor(private router: RouterExtensions, private active: ActivatedRoute, private page: Page) { }

    ngOnInit(): void {
        this.router.navigate(
            [{outlets: {currentChallenge: ['current-challenge'], today: ['today']}}],
            { relativeTo: this.active}
        );
        this.page.actionBarHidden = true;

        // work around for bug in this version:
        // https://github.com/NativeScript/NativeScript/issues/8251
        if (!isAndroid) return;
        this.page.on('navigatedTo', (data) => {
            // console.log("data: ", data);
            if (!data['object']['_onUnloadedCalled']) return;
            let bottomNav = this.bottomNavEl.nativeElement;
            let currentSelect = bottomNav.selectedIndex;
            let index = currentSelect === bottomNav.items.length - 1 ? currentSelect - 1 : currentSelect + 1;
            if (index < 0) return;
            console.log("new selection: ", index);
            console.log("old selection: ", currentSelect);
            bottomNav.selectedIndex = index;
            bottomNav.selectedIndex = currentSelect;
        });
    }

}
