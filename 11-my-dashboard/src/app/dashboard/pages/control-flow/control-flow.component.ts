import { Component, signal } from '@angular/core';
import { TitleComponent } from "../../../shared/title/title.component";

type Grade = 'A' | 'B' | 'F'

@Component({
  selector: 'pages-control-flow',
  imports: [TitleComponent],
  templateUrl: './control-flow.component.html',
})
export default class ControlFlowComponent {
  public showContent = signal(false)
  public grade = signal<Grade>('A')
  public frameworks = signal<string[]>(['Angular', 'React', 'Vue', 'Svelte', 'Qwik'])
  public frameworks2 = signal<string[]>([])

  // asReadonly() es un método que devuelve un signal de sólo lectura
  // public showContent = signal(false).asReadonly()

  public toggleContent() {
    this.showContent.update(value => !value)
  }
}
