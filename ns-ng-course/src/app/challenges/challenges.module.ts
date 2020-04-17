import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ChallengesRoutingModule } from "./challenges-routing.module";
import { ChallengeTabsComponent } from "./challenge-tabs/challenge-tabs.component";
import { CurrentChallengeComponent } from "./current-challenge/current-challenge.component";
import { TodayComponent } from "./today/today.component";
import { SharedModule } from "../shared/ui/shared.module";
import { ChallengeActionsComponent } from './challenge-actions/challenge-actions.component';
import { ChallengeActionsModule } from "~/app/challenges/challenge-actions/challenge-actions.module";

@NgModule({
    imports: [NativeScriptCommonModule, ChallengesRoutingModule, SharedModule, ChallengeActionsModule],
    declarations: [
        ChallengeTabsComponent,
        CurrentChallengeComponent,
        TodayComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ChallengesModule {}
