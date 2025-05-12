import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-heavy-loaders-slow',
  imports: [CommonModule],
  template: `
    <section [ngClass]="['w-full h-[600px]', cssClass]">Heavy loaders slow</section>
  `
})
export class HeavyLoadersSlowComponent {
  @Input({ required: true }) cssClass!: string

  constructor() {
    const start = Date.now()

    while(Date.now() - start < 3000) { }

    console.log('Loaded')
  }
}
