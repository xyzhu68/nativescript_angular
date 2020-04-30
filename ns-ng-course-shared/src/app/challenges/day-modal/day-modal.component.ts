
import { DayStatus } from '../day.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ns-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.scss']
})
export class DayModalComponent implements OnInit {
    loadedDate: Date;
    loadedStatus: 'complete' | 'fail' = null;
    DayStatus = DayStatus; // to enable use enum in html

    @Input() selectedDate: Date;
    @Input() selectedStatus: DayStatus;
    @Output() actionSelect = new EventEmitter<DayStatus>();

    constructor() { }

    ngOnInit(): void {
        this.loadedDate = this.selectedDate;
        if (this.selectedStatus === DayStatus.Completed) {
            this.loadedStatus = 'complete';
        } else if (this.selectedStatus === DayStatus.Failed) {
            this.loadedStatus = 'fail';
        } else {
            this.loadedStatus = null;
        }
    }

    onHandleInput(action: DayStatus) {
        this.actionSelect.emit(action);
    }
}
