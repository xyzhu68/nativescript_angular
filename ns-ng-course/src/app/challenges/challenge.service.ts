
import { AuthService } from './../auth/auth.service';
import { Challenge } from '~/app/challenges/challenge.model';
import { Day } from '~/app/challenges/day.model';
import { DayStatus } from './day.model';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';
import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'tns-core-modules/ui/page/page';

type ChallengeWeb = {
    title: string,
    description: string,
    month: number,
    year: number,
    _days: Day[]
};

@Injectable({providedIn: 'root'})
export class ChallengeService implements OnDestroy {
    private _currentChallenge = new BehaviorSubject<Challenge>(null);
    private userSub: Subscription;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.userSub = authService.user.subscribe(user => {
            if (!user) {
                this._currentChallenge.next(null);
            }
        });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    get currentChallenge() {
        return this._currentChallenge.asObservable();
    }


    fetchCurrentChallenge(): Observable<ChallengeWeb> {
        return this.authService.user
            .pipe(
                take(1),
                switchMap(currentUser => {
                    if (!currentUser || !currentUser.isAuth) {
                        return of(null);
                    }
                    return this.http.get<ChallengeWeb>(`https://ns-ng-course-c245b.firebaseio.com/challenge/${currentUser.id}.json?auth=${currentUser.token}`);
                }),
                tap(resData => {
                    if (resData) {
                        const loadedChallenge = new Challenge(resData.title, resData.description, resData.year, resData.month, resData._days);
                        this._currentChallenge.next(loadedChallenge);
                    }
                })
            );
    }

    createNewChallenge(title: string, description: string) {
        const challenge = new Challenge(title, description, new Date().getFullYear(), new Date().getMonth());
        this.saveToServer(challenge);
        this._currentChallenge.next(challenge);
    }

    updateChallenge(title: string, description: string) {
        this._currentChallenge.pipe(take(1)).subscribe(challenge => {
            if (!challenge )
                return;
            challenge.title = title;
            challenge.description = description;
            this.saveToServer(challenge);
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
            this.saveToServer(challenge);
        });
    }

    private saveToServer(challenge: Challenge) {
        return this.authService.user
        .pipe(
            take(1),
            switchMap(currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of (null);
                }
                return this.http.put(`https://ns-ng-course-c245b.firebaseio.com/challenge/${currentUser.id}.json?auth=${currentUser.token}`, challenge);
            })
        ).subscribe(res => console.log(res));
    }
}
