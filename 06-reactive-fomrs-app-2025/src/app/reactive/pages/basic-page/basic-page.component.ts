import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'reactive-basic-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './basic-page.component.html'
})
export class BasicPageComponent {
  private fb = inject(FormBuilder)
  formUtils = FormUtils

  // Forma 2 de trabajar con formularios reactivos
  // Se especifican los valores iniciales y validaciones (tanto sincronas como asincronas)
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  })

  // Forma 1 de trabajar con formularios reactivos
  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0)
  // })

  onSave() {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return
    }

    this.myForm.reset({
      name: '',
      price: 0,
      inStorage: 0
    })
  }
}
