import { DayStatus } from '../day.model';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ns-challenge-actions',
  templateUrl: './challenge-actions.component.html',
  styleUrls: ['./challenge-actions.component.scss']
})
export class ChallengeActionsComponent implements OnInit, OnChanges {
    @Output() actionSelect = new EventEmitter<DayStatus>();
    @Input() cancelText = 'Cancel';
    @Input() chosen: 'complete' | 'faile' = null;
    @Input() startDone = false; // done at loading
    action: 'complete' | 'fail' = null;
    done = false;

    constructor() { }

    ngOnInit(): void {
    }

    // if input has new value
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.chosen) {
            this.action = changes.chosen.currentValue;

            if (changes.chosen.currentValue === null) {
                this.done = false;
            }
        }

        if (changes.startDone) {
            if (changes.startDone.currentValue) {
                this.done = true;
            }
        }
    }

    onAction(action: 'complete' | 'fail' | 'cancel') {
        this.done = true;
        let status = DayStatus.Open;
        if (action === 'complete') {
            status = DayStatus.Completed;
            this.action = 'complete';
        } else if (action === 'fail') {
            status = DayStatus.Failed;
            this.action = 'fail';
        } else {
            this.action = null;
            this.done = false;
        }
        this.actionSelect.emit(status);
    }
}
