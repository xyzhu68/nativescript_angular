import { ChallengeService } from './../challenge.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ns-challenge-edit',
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.scss']
})
export class ChallengeEditComponent implements OnInit {
    isCreating = true;
    title = '';
    description = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private challengeService: ChallengeService) {}

    ngOnInit() {
        // this.activatedRoute.paramMap.subscribe(paramMap => {
        //     console.log(paramMap.get('mode'));
        // });

        this.activatedRoute.paramMap.subscribe(paramMap => {
            if (!paramMap.has('mode')) {
                this.isCreating = true;
            } else {
                this.isCreating = paramMap.get('mode') !== 'edit';
            }

            if (this.isCreating) {
                this.title = '';
                this.description = '';
            } else {
                this.challengeService.currentChallenge.pipe(take(1), switchMap(curChallenge => {
                    if (!curChallenge) {
                        return this.challengeService.fetchCurrentChallenge();
                    }
                    return of(curChallenge);
                })).subscribe(challenge => {
                    if (challenge) {
                        this.title = challenge.title;
                        this.description = challenge.description;
                    }
                });
            }
        });

    }

    onSubmit(title: string, description: string) {
        let observableResult: Observable<any> = null;
        if (this.isCreating) {
            observableResult = this.challengeService.createNewChallenge(title, description);
        } else {
            observableResult = this.challengeService.updateChallenge(title, description);
        }

        // this "back" function does not work (issue angular) for lazy loading
        // this.router.navigate(['..'], { relativeTo: this.activatedRoute });

        observableResult.subscribe(() => this.router.navigate(['/challenges/current-challenge']));
    }
}
