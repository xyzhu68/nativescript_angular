import { RouterModule } from '@angular/router';

import { AuthComponent } from '@src/app/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [AuthComponent],
    imports: [ CommonModule,
               RouterModule.forChild([
                    {
                        path: '',
                        component: AuthComponent
                    }
                ]),
                ReactiveFormsModule]
})
export class AuthModule {}
