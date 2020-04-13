import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ChallengeEditComponent } from "./challenge-edit.component";
import { SharedModule } from "~/app/shared/ui/shared.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";

@NgModule({
    imports: [  NativeScriptCommonModule,
                SharedModule,
                NativeScriptRouterModule.forChild([
                    {
                        path: '', component: ChallengeEditComponent
                    }
                ])
            ],
    declarations: [ChallengeEditComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ChallengeEditModule {}
