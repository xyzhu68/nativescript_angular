import { PersonsService } from './persons.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-person-input',
  templateUrl: './person-input.component.html',
  styleUrls: ['./person-input.component.css']
})
export class PersonInputComponent {
  enteredPersonName = '';

  constructor(private prsService: PersonsService) {}

  onCreatePerson() {
    this.prsService.addPersion(this.enteredPersonName);
    this.enteredPersonName = '';
  }
}
