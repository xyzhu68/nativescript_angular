import { NgModule } from '@angular/core';
import { ActionBarComponent } from '@src/app/shared/ui/action-bar/action-bar.component.tns';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

@NgModule({
    imports: [NativeScriptCommonModule, NativeScriptRouterModule],
    declarations: [ActionBarComponent],
    exports: [ActionBarComponent]
})
export class SharedModule {}
