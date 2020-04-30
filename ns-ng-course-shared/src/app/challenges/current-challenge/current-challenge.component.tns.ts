import { Day, DayStatus } from '../day.model';
import { Subscription } from 'rxjs';
import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { DayModalComponent } from '../day-modal/day-modal.component';
import { UIService } from '../../shared/ui/ui.service';
import { ChallengeService } from '../challenge.service';
import { Challenge } from '../challenge.model';


@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.common.scss'],
    moduleId: module.id
})
export class CurrentChallengeComponent implements OnInit, OnDestroy {
    Actions = DayStatus; // for html

    weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    currentChallenge: Challenge;

    private currentChallengeSub: Subscription;

    constructor(
        private modalDialog: ModalDialogService,
        private vcRef: ViewContainerRef,
        private uiService: UIService,
        private challengeService: ChallengeService
    ) {}


    ngOnInit() {
        this.currentChallengeSub = this.challengeService.currentChallenge.subscribe(challenge => {
            this.currentChallenge = challenge;
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
        this.modalDialog.showModal
                    (   DayModalComponent,
                        {   fullscreen: false,
                            viewContainerRef: this.uiService.getRootVCRef() ? this.uiService.getRootVCRef() : this.vcRef,
                            context: { date: day.date, status: day.status }
                        }
                    ).then((status: DayStatus) => {
                        if (status === DayStatus.Open) {
                            return;
                        }
                        this.challengeService.updateDayStatus(day.dayInMonth, status);
                    });
    }
}



