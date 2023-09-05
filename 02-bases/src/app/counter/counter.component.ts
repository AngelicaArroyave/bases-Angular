import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  // templateUrl: './counter.component.html',
  // styleUrls: ['./counter.component.css']
  template: `
    <h3> Counter: {{ counter }} </h3>

    <button (click)="increaseBy('increase',3)"> + </button>
    <button (click)="increaseBy('decrease',1)"> - </button>
    <button (click)="resetCounter()"> Reset </button>
  `
})
export class CounterComponent {
  counter: number = 10

  increaseBy(action: string = 'increase', value: number = 1): void {
    (action === 'increase') ? this.counter += value : this.counter -= value
  }

  resetCounter(): void {
    this.counter = 10
  }
}
