import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent {

  @Output()
  public OnNewCharacter: EventEmitter<Character> = new EventEmitter()

  public character: Character = {
    name: '',
    power: 0
  }

  emitCharacter(): void {
    if(this.character.name.length === 0) return // Si no tiene nombre, no se puede guardar

    this.OnNewCharacter.emit(this.character)

    this.character = { name: '', power: 0 }
  }
}
