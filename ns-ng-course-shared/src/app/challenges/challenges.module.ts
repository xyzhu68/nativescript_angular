import { DayModalComponent } from './day-modal/day-modal.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChallengesRoutingModule } from './challenges-routing.module';
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';
import { TodayComponent } from './today/today.component';
import { SharedModule } from '../shared/shared.module';
import { ChallengeActionsModule } from './challenge-actions/challenge-actions.module';
import { BackdropComponent } from './day-modal/backdrop.component';

@NgModule({
    imports: [CommonModule, ChallengesRoutingModule, SharedModule, ChallengeActionsModule],
    declarations: [
        CurrentChallengeComponent,
        DayModalComponent,
        BackdropComponent,
        TodayComponent
    ]
})
export class ChallengesModule {}
