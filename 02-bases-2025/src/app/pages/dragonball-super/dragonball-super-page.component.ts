import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CharacterAddComponent } from '../../components/dragonball/character-add/character-add.component';
import { CharacterListComponent } from '../../components/dragonball/character-list/character-list.component';
import { DragonballService } from '../../services/dragonball.service';

@Component({
  templateUrl: 'dragonball-super-page.component.html',
  imports: [
    CharacterAddComponent,
    CharacterListComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragonballSuperPageComponent {
  public dragonballService = inject(DragonballService)
}
