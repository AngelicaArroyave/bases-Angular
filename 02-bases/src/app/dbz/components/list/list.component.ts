import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Input()
  public characterList: Character[] = [{
    name: 'Trunks',
    power: 100
  }]

  @Output()
  // public onDeleteId: EventEmitter<number> = new EventEmitter()
  public onDeleteId: EventEmitter<string> = new EventEmitter()

  // emitCharacter(index: number): void {
  //   this.onDeleteId.emit(index)
  // }
  
  emitCharacter(id?: string): void {
    if(!id) return

    this.onDeleteId.emit(id)
  }
}
