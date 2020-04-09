import { ChallengeTabsComponent } from './challenges/challenge-tabs/challenge-tabs.component';
import { ChallengeEditComponent } from './challenges/challenge-edit/challenge-edit.component';
import { CurrentChallengeComponent } from './challenges/current-challenge/current-challenge.component';
import { TodayComponent } from './challenges/today/today.component';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'challenge-edit', component: ChallengeEditComponent },
    { path: 'challenges', component: ChallengeTabsComponent,
        children: [
            { path: 'today', component: TodayComponent, outlet: 'today' },
            { path: 'current-challenge', component: CurrentChallengeComponent, outlet: 'currentChallenge' }
        ]
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
