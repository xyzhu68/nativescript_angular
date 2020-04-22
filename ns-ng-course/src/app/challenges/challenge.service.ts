import { DayStatus } from './day.model';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Challenge } from '~/app/challenges/challenge.model';

@Injectable({providedIn: 'root'})
export class ChallengeService {
    private _currentChallenge = new BehaviorSubject<Challenge>(null)

    get currentChallenge() {
        return this._currentChallenge.asObservable();
    }

    createNewChallenge(title: string, description: string) {
        const challenge = new Challenge(title, description, new Date().getFullYear(), new Date().getMonth());
        // save it to server
        this._currentChallenge.next(challenge);
    }

    updateChallenge(title: string, description: string) {
        this._currentChallenge.pipe(take(1)).subscribe(challenge => {
            if (!challenge )
                return;
            challenge.title = title;
            challenge.description = description;
            // save this to a server
            this._currentChallenge.next(challenge);
        });
    }

    updateDayStatus(dayInMonth: number, status: DayStatus) {
        this._currentChallenge.pipe(take(1)).subscribe(challenge => {
            if (!challenge || challenge.days.length < dayInMonth)
                return;
            const dayIndex = challenge.days.findIndex(d => d.dayInMonth === dayInMonth);
            challenge.days[dayIndex].status = status;
            this._currentChallenge.next(challenge);
            console.log(challenge.days[dayIndex]);
            // save this to a server
        });
    }
}
