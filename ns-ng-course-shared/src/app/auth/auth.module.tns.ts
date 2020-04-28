import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { AuthComponent } from '@src/app/auth/auth.component';
import { SharedModule } from '@src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [AuthComponent],
    imports: [  NativeScriptCommonModule,
                NativeScriptRouterModule.forChild([
                    {
                        path: '',
                        component: AuthComponent
                    }
                ]),
                NativeScriptFormsModule,
                ReactiveFormsModule,
                SharedModule]
})
export class AuthModule {}
