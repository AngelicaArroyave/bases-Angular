import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'reactive-dynamic-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './dynamic-page.component.html'
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder)
  formaUtils = FormUtils

  newFavorite = new FormControl('', Validators.required)

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Resident Evil', Validators.required]
    ], Validators.minLength(3))
  })

  get favoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray
  }

  onAddToFavorites() {
    if(this.newFavorite.invalid) return

    const nweGame = this.newFavorite.value

    this.favoriteGames.push(this.fb.control(nweGame, Validators.required))
    this.newFavorite.reset()
  }

  onRemoveFromFavorites(index: number) {
    this.favoriteGames.removeAt(index)
  }

  onSubmit() {
    this.myForm.markAllAsTouched()
  }
}
