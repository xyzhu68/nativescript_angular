import { AuthService } from './auth/auth.service';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, ViewContainerRef } from "@angular/core";
import { UIService } from "~/app/shared/ui/ui.service";
import { Subscription } from "rxjs";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Utils } from "./shared/ui/utils";


@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(RadSideDrawerComponent, {static: false}) drawerComponent: RadSideDrawerComponent;

    private drawerSub: Subscription;
    private drawer: RadSideDrawer;

    public get statusbarHeight() { return Utils.statusbarHeight(); }

    constructor(private uiService: UIService,
                private changeDetectionRef: ChangeDetectorRef,
                private vcRef: ViewContainerRef,
                private authService: AuthService
            ) {}

    ngOnInit() {
        this.drawerSub = this.uiService.drawerState.subscribe(() => {
            if (this.drawer) {
                this.drawer.toggleDrawerState();
            }
        });
        this.uiService.setRootVCRef(this.vcRef);
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

    onLogout() {
        this.drawer.toggleDrawerState();
        this.authService.logout();
    }
}
