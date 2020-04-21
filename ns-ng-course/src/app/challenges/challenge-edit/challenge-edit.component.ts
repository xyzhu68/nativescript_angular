import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-challenge-edit',
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.scss'],
  moduleId: module.id
})
export class ChallengeEditComponent implements OnInit {
    isCreating = true;

    constructor(private activatedRoute: ActivatedRoute, private pageRoute: PageRoute, private router: RouterExtensions) {}

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
            });
        });
    }

    onSubmit(title: string, description: string) {
        console.log(title, description);
        this.router.backToPreviousPage();
    }
}
