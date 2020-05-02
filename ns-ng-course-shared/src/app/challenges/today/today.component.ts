
import { Day, DayStatus } from '../day.model';
import { ChallengeService } from './../challenge.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'ns-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
  moduleId: module.id
})
export class TodayComponent implements OnInit, OnDestroy {
    currentDay: Day;
    isLoading = false;
    private curChallengeSub: Subscription;

    constructor(private challengeService: ChallengeService) { }

    ngOnInit(): void {
        this.curChallengeSub = this.challengeService.currentChallenge.subscribe(challenge => {
            if (challenge) {
                this.currentDay = challenge.currentDay;
            }
        });

        this.isLoading = true;

        this.challengeService.fetchCurrentChallenge().subscribe(res => {
            console.log(res);
            this.isLoading = false;
        }, err => {
            console.log(err);
            this.isLoading = false;
        });
    }
    ngOnDestroy(): void {
        if (this.curChallengeSub) {
            this.curChallengeSub.unsubscribe();
        }
    }

    onActionSelected(action: DayStatus) {
        this.challengeService.updateDayStatus(this.currentDay.dayInMonth, action);
    }

    getActionName() {
        if (this.currentDay.status === DayStatus.Completed) {
            return 'complete';
        } else if (this.currentDay.status === DayStatus.Failed) {
            return 'fail';
        }
        return null;
    }
}
