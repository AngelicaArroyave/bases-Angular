import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

interface Character {
  id: number,
  name: string;
  power: number;
}

@Component({
  templateUrl: 'dragonball-page.component.html',
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragonballPageComponent {
  name = signal('')
  power = signal(0)
  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    // { id: 2, name: 'Vegeta', power: 8000 },
    // { id: 3, name: 'Trunks', power: 3000 },
    // { id: 4, name: 'Piccolo', power: 2000 },
    // { id: 5, name: 'Yamcha', power: 500 },
  ])

  addCharacter() {
    if(!this.name() || !this.power() || this.power() <= 0) return

    const newCharacter = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power()
    }

    this.characters.update(characters => [...characters, newCharacter])
    this.resetFields()
  }

  resetFields() {
    this.name.set('')
    this.power.set(0)
  }

  // powerClasses = computed(() => {
  //   return {
  //     'text-danger': true
  //   }
  // })
}
