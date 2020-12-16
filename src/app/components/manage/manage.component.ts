//ng generate component components/manage
import { Component } from '@angular/core';
import {StocksService} from '../../services/stocks.service';
import {Student} from '../../student';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {
  students: Array<Student>;
  subjects: Array<string>;

  tempName: string;
  tempSurname: string;
  tempIndex: number;
  tempSubject: string;

  constructor(private service: StocksService) {
    this.students = service.get();
    this.subjects = service.get_subjects();
  }

  add() {
    if (this.tempName !== '' && this.tempSurname !== '' &&
      this.tempIndex.toString().length === 4)
    {
      this.students = this.service.add({
        nrIndeksu: this.tempIndex,
        imie: this.tempName,
        nazwisko: this.tempSurname
      });
      this.tempName = '';
      this.tempSurname = '';
      this.tempIndex = 0;
    }
  }

  remove(symbol) {
    this.students = this.service.remove(symbol);
  }

  dodaj_przedmiot() {
    if (this.tempSubject !== '')
    {
      this.subjects = this.service.add_subject(this.tempSubject);
      this.tempSubject = '';
    }
  }
}
