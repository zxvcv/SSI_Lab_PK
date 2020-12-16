// ng generate service services/stocks
import { Injectable } from '@angular/core';
import { Student } from '../student';
import { STUDENCI } from '../studenci-db';

const students: Array<Student> = STUDENCI;

@Injectable()

export class StocksService {
  constructor() {}

  get() {
    return students.slice();
  }

  update(index, data) {
    students[index] = data;
  }

  add(item) {
    students.push(item);
    return this.get();
  }

  remove(index) {
    students.splice(index, 1);
    return this.get();
  }

  get_subjects() {
    const subjects = [];
    for (let i = 0; i < students[0].oceny.length; ++i)
    {
      subjects.push(students[0].oceny[i].przedmiot);
    }
    return subjects;
  }

  add_subject(subject) {
    for (let i = 0; i < students.length; ++i)
    {
      students[i].oceny.push({
        przedmiot: subject,
        wartosc: null
      });
    }
    return this.get_subjects();
  }
}
