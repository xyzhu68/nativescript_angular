
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

import { UIService } from './shared/ui/ui.service';
import { AuthService } from './auth/auth.service';
import { Utils } from './shared/utils';

@Component({
  selector: 'ns-app',
  moduleId: module.id,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(RadSideDrawerComponent, {static: false}) drawerComponent: RadSideDrawerComponent;
  activeChallenge = '';
  private drawerSub: Subscription;
  private drawer: RadSideDrawer;

  public get statusbarHeight() { return Utils.statusbarHeight(); }

  constructor(
    private uiService: UIService,
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

  // onChallengeInput(challengeDescription: string) {
  //   this.activeChallenge = challengeDescription;
  //   console.log('onChallengeInput: ', challengeDescription);
  // }

  onLogout() {
    this.uiService.toggleDrawer();
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.drawerSub) {
      this.drawerSub.unsubscribe();
    }
  }
}
