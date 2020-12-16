//ng generate component components/dashboard
import { Component } from '@angular/core';
import { StocksService } from '../../services/stocks.service';
import {Student} from '../../student';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  students: Array<Student>;
  subjects: Array<string>;

  focused: number;
  editMode: number;

  constructor(private service: StocksService) {
    this.students = service.get();
    this.subjects = service.get_subjects();
    this.focused = -1;
    this.editMode = 0;
  }

  getOcena(ocena){
    if (ocena == null){
      return 'brak oceny';
    }
    else{
      return ocena;
    }
  }

  getSrednia(){
    let suma = 0;
    let ilosc = 0;
    for (let i = 0; i < this.students[this.focused].oceny.length; ++i){
      if (this.students[this.focused].oceny[i] != null) {
        suma += this.students[this.focused].oceny[i].wartosc;
        ilosc += 1;
      }
    }
    return suma / ilosc;
  }

  setFocus(index){
    this.focused = index;
  }

  goEditMode(){
    this.editMode = 1;
  }

  saveEdited(){
    this.editMode = 0;
    const std = this.students[this.focused];

    this.service.update(this.focused, this.students[this.focused]);

    this.focused = -1;
  }
}
