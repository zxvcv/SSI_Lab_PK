//ng generate component metric
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.css']
})
export class MetricComponent{

  // tslint:disable-next-line:variable-name
    private _value = 0;
  // tslint:disable-next-line:variable-name
    private _max = 100;
  // tslint:disable-next-line:no-input-rename
    @Input('used')
    set value(value: number) {
      if (isNaN(value)) { value = 0; }
      this._value = value;
    }
    get value(): number {
      return this._value;
    }
  // tslint:disable-next-line:no-input-rename
    @Input('available')
    set max(max: number) {
      if (isNaN(max)){ max = 100; }
      this._max = max;
    }
    get max(): number {
      return this._max;
    }

    isDanger(): boolean {
      return this.value / this.max > 0.7;
    }
}
