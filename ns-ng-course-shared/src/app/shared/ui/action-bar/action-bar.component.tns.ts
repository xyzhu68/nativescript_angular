import { Component, OnInit, Input } from '@angular/core';
import { isAndroid } from 'tns-core-modules/platform/platform';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { UIService } from '../ui.service';

declare var android: any;

@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  moduleId: module.id
})
export class ActionBarComponent implements OnInit {

    @Input() title: string;
    @Input() showBackButton = true;
    @Input() hasMenu = true;

    constructor(private page: Page, private router: RouterExtensions, private uiService: UIService) { }

    ngOnInit(): void {
    }

    get android() {
        return isAndroid;
    }

    get canGoBack() {
        // canGoBack returns true, before loading, which cause ugly jump --> use showBackButton to avoid this
        return this.router.canGoBack() && this.showBackButton;
    }

    onGoBack() {
        this.router.backToPreviousPage();
    }

    onLoadedActionBar() {
        // only for android back button
        if (isAndroid) {
            const androidToolbar = this.page.actionBar.nativeView;
            const backButton = androidToolbar.getNavigationIcon();
            let color = '#171717';
            if (this.hasMenu) {
                color = '#ffffff';
            }
            if (backButton) {
                backButton.setColorFilter(android.graphics.Color.parseColor(color), (<any>android.graphics).PorterDuff.Mode.SRC_ATOP);
            }
        }
    }

    onToggleMenu() {
        this.uiService.toggleDrawer();
    }
}
