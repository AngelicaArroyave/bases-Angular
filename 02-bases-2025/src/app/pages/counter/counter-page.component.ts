import { ChangeDetectionStrategy, Component, signal } from '@angular/core'

@Component({
  selector: 'app-counter',
  templateUrl: 'counter-page.component.html',
  styles: [`
    button {
      padding: 5px;
      margin: 5px 10px;
      width: 70px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterPageComponent {
  counter = 10
  counterSignal = signal(10)

  increaseBy(value: number) {
    this.counter += value
    this.counterSignal.update(current => current + value)
  }

  decreaseBy(value: number) {
    this.counter -= value
    this.counterSignal.update(current => current - value)
  }

  resetCounter(value: number) {
    this.counter = 0
    this.counterSignal.set(0)
  }
}
