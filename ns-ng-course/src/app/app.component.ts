import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import * as application from "tns-core-modules/application";
import { UIService } from "~/app/shared/ui/ui.service";
import { Subscription } from "rxjs";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    private getStatusBarHeight() {
        let result:number = 0;
        let resourceId:number = application.android.context.getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {

            result = application.android.context.getResources().getDimensionPixelSize(resourceId);
        }
        console.log("statusbar height (in px): ", result);
        return result;
    }
    public statusbarHeight = this.getStatusBarHeight().toString() + "px";

    @ViewChild(RadSideDrawerComponent, {static: false}) drawerComponent: RadSideDrawerComponent;

    private drawerSub: Subscription;
    private drawer: RadSideDrawer;

    constructor(private uiService: UIService, private changeDetectionRef: ChangeDetectorRef) {}

    ngOnInit() {
        this.drawerSub = this.uiService.drawerState.subscribe(() => {
            if (this.drawer) {
                this.drawer.toggleDrawerState();
            }
        });
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();
    }

    ngOnDestroy() {
        if (this.drawerSub)
            this.drawerSub.unsubscribe();
    }

    activeChallenge = '';
    onChallengeInput(challengeDescription: string) {
        this.activeChallenge = challengeDescription;
        console.log("onChallenge:", challengeDescription);
    }
}
