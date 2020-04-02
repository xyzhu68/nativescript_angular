import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PersonsService {
  personsChanged = new Subject<string[]>();
  persons = [];

  constructor(private http: HttpClient) {}

  fetchPersons() {
    this.http.get<any>('https://swapi.co/api/people').
      pipe(map(resData => {
        return resData.results.map(character => character.name);
      })).
      subscribe(resData => {
        this.personsChanged.next(resData);
    });
  }

  addPersion(name: string) {
    this.persons.push(name);
    this.personsChanged.next(this.persons);
  }

  removePerson(name: string) {
    this.persons = this.persons.filter(person => person !== name );
    this.personsChanged.next(this.persons);
  }
}
