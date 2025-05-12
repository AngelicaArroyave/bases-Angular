import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TitleComponent } from "../../../shared/title/title.component";
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'pages-change-detection',
  imports: [
    JsonPipe,
    TitleComponent
  ],
  template: `
    <shared-title [title]="currentFramework()" />

    <pre>{{ frameworkAsSignal() | json }}</pre>
    <pre>{{ frameworkAsProperty | json }}</pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ChangeDetectionComponent {
  public currentFramework = computed(() => `Change Detection: ${this.frameworkAsSignal().name}`)

  public frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016
  })

  public frameworkAsProperty = {
    name: 'Angular',
    releaseDate: 2016
  }

  constructor() {
    setTimeout(() => {
      // ChangeDetectionStrategy = Default
      // this.frameworkAsProperty.name = 'React'

      // ChangeDetectionStrategy = OnPush
      this.frameworkAsSignal.update(framework => ({ ...framework, name: 'React' }))
      console.log('Ready')
    }, 3000);
  }
}
