import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent {

  // Forma 1
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0)
  // })

  // Forma 2
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  })

  constructor(private fb: FormBuilder, private validatorsService: ValidatorsService) { }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field)
  }

  getFieldError(field: string): string | null {
    if(!this.myForm.controls[field]) return null

    const errors = this.myForm.controls[field].errors || { }

    for(const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`
      }
    }

    return null
  }

  onSave(): void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return
    }

    this.myForm.reset({
      price: 0,
      inStorage: 0
    })
  }
}
