import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ChallengesRoutingModule } from "./challenges-routing.module";
import { ChallengeTabsComponent } from "./challenge-tabs/challenge-tabs.component";
import { CurrentChallengeComponent } from "./current-challenge/current-challenge.component";
import { TodayComponent } from "./today/today.component";
import { SharedModule } from "../shared/ui/shared.module";

@NgModule({
    imports: [NativeScriptCommonModule, ChallengesRoutingModule, SharedModule],
    declarations: [
        ChallengeTabsComponent,
        CurrentChallengeComponent,
        TodayComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ChallengesModule {}
