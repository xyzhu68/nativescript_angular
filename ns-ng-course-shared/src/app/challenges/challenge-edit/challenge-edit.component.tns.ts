import { ChallengeService } from './../challenge.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'ns-challenge-edit',
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.scss'],
  moduleId: module.id
})
export class ChallengeEditComponent implements OnInit {
    isCreating = true;
    title = '';
    description = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private pageRoute: PageRoute,
        private router: RouterExtensions,
        private challengeService: ChallengeService) {}

    ngOnInit() {
        // this.activatedRoute.paramMap.subscribe(paramMap => {
        //     console.log(paramMap.get('mode'));
        // });

        // use PageRoute to avoid cache-effect. The method above used pages in stack,
        // which means, if I navigate pages back and forth, no new data are fetched.
        // PageRoute will update data each time, the current page is shown
        this.pageRoute.activatedRoute.subscribe(activatedRoute => {
            activatedRoute.paramMap.subscribe(paramMap => {
                if (!paramMap.has('mode')) {
                    this.isCreating = true;
                } else {
                    this.isCreating = paramMap.get('mode') !== 'edit';
                }

                if (!this.isCreating) {
                    this.challengeService.currentChallenge.pipe(take(1)).subscribe(challenge => {
                        this.title = challenge.title;
                        this.description = challenge.description;
                    });
                }
            });
        });
    }

    onSubmit(title: string, description: string) {
        let observableResult: Observable<any> = null;
        if (this.isCreating) {
            observableResult = this.challengeService.createNewChallenge(title, description);
        } else {
            observableResult = this.challengeService.updateChallenge(title, description);
        }
        observableResult.subscribe(() => this.router.backToPreviousPage());
    }
}
