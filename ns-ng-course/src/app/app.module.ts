
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule} from "nativescript-ui-sidedrawer/angular/side-drawer-directives";

import { AppComponent } from "./app.component";

// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from '~/app/app-routing.module';
import { DayModalComponent } from './challenges/day-modal/day-modal.component';
import { SharedModule } from "./shared/ui/shared.module";
import { ChallengeActionsModule } from "~/app/challenges/challenge-actions/challenge-actions.module";
import { ReactiveFormsModule } from "@angular/forms";


// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule,
        ReactiveFormsModule,
        SharedModule,
        ChallengeActionsModule
    ],
    declarations: [
        AppComponent,
        AuthComponent,
        DayModalComponent
    ],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA],
    // for components whose selector is not used and no router for it is defined. For example: modal dialog component
    entryComponents: [DayModalComponent]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
