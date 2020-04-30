import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ChallengeActionsComponent } from './challenge-actions.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

@NgModule({
    declarations: [ChallengeActionsComponent],
    imports: [NativeScriptCommonModule],
    exports: [ChallengeActionsComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ChallengeActionsModule {}
