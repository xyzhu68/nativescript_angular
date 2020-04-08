import { Component } from "@angular/core";
import * as application from "tns-core-modules/application";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {
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

    activeChallenge = '';
    onChallengeInput(challengeDescription: string) {
        this.activeChallenge = challengeDescription;
        console.log("onChallenge:", challengeDescription);
    }
}
