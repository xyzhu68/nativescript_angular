
import { AuthComponent } from './auth/auth.component';
import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

const routes: Routes = [
    { path: '', component: AuthComponent },

    { path: 'challenges',
      loadChildren: '~/app/challenges/challenges.module#ChallengesModule'
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
