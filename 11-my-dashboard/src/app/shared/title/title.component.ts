import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'shared-title',
  imports: [],
  template: `
    <h2 class="text-3xl mb-5">{{ title }}</h2>
  `
})
export class TitleComponent {
  @Input({ required: true }) title!: string
  @Input({ transform: booleanAttribute }) withShadow: boolean = false
}
