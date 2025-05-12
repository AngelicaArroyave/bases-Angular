import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import * as customValidators from 'src/app/shared/validators/validators.functions';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    // name: ['', [ Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern) ]], // Forma 1
    name: ['', [ Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern) ]], // Forma 2
    // email: ['', [ Validators.required, Validators.pattern(customValidators.emailPattern)]], // Forma 1
    // email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern)]], // Forma 2
    email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [ this.emailValidator ]], // Forma 3
    // username: ['', [ Validators.required, customValidators.cantBeStrider ]], // Forma 1
    username: ['', [ Validators.required, this.validatorsService.cantBeStrider ]], // Forma 2
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    confirmPassword: ['', [ Validators.required ]]
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'confirmPassword')
    ]
  })

  constructor(private fb: FormBuilder, private validatorsService: ValidatorsService, private emailValidator: EmailValidatorService) { }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field)
  }

  onSubmit(): void {
    this.myForm.markAllAsTouched()
  }
}
