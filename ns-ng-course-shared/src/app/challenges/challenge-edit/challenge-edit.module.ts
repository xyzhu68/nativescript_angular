import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ChallengeEditComponent } from './challenge-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [  CommonModule,
                SharedModule,
                FormsModule,
                RouterModule.forChild([
                    {
                        path: '', component: ChallengeEditComponent
                    }
                ])
            ],
    declarations: [ChallengeEditComponent]
})
export class ChallengeEditModule {}
