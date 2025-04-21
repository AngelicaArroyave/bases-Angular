import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-numbers-page',
  imports: [
    DecimalPipe,
    PercentPipe,
    CurrencyPipe
  ],
  templateUrl: './numbers-page.component.html'
})
export default class NumbersPageComponent {
  totalSells = signal(2_543_675.5567)
  percent = signal(0.4856)
}
