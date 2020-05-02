import { Day, DayStatus } from '../day.model';
import { Subscription } from 'rxjs';
import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { UIService } from '../../shared/ui/ui.service';
import { ChallengeService } from '../challenge.service';
import { Challenge } from '../challenge.model';


@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.common.scss']
})
export class CurrentChallengeComponent implements OnInit, OnDestroy {
    Actions = DayStatus; // for html

    weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    currentChallenge: Challenge;
    isLoading = false;
    selectedDay: Day;

    private currentChallengeSub: Subscription;

    constructor(
        private vcRef: ViewContainerRef,
        private uiService: UIService,
        private challengeService: ChallengeService
    ) {}


    ngOnInit() {
        this.currentChallengeSub = this.challengeService.currentChallenge.subscribe(challenge => {
            this.currentChallenge = challenge;
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
    ngOnDestroy() {
        if (this.currentChallengeSub) {
            this.currentChallengeSub.unsubscribe();
        }
    }

    getIsSettable(dayInMonth: number) {
        return dayInMonth <= new Date().getDate();
    }

    getRow(index: number, day: Day) {
        const startRow = 1;
        const weekRow = Math.floor(index / 7);
        const firstWeekDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
        const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;

        return startRow + weekRow + irregularRow;
    }

    onChangeStatus(day: Day) {
        if (! this.getIsSettable(day.dayInMonth)) {
            return;
        }
        this.selectedDay = day;
    }

    onUpdateState(selectedStatus: DayStatus) {
        if (selectedStatus === DayStatus.Open) {
            this.selectedDay = null;
            return;
        }
        this.challengeService.updateDayStatus(this.selectedDay.dayInMonth, selectedStatus);
        this.selectedDay = null;
    }
}
