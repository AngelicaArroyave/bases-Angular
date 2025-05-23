import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  })

  public person = {
    gender: 'F',
    wantNotifications: false
  }

  constructor(private fb: FormBuilder, private validatorsService: ValidatorsService) { }

  ngOnInit(): void {
    this.myForm.reset(this.person)
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field)
  }

  onSubmit(): void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return
    }

    const { termsAndConditions, ...newPersoon } = this.myForm.value
    this.person = newPersoon
  }
}
