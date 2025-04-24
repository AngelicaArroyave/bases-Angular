import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

async function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 2500);
  })
}

export class FormUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors): string | null {
    for(const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`
        case 'min':
          return `Valor mínimo de ${errors['min'].min}`
        case 'email':
          return `El email no es válido`
        case 'emailTaken':
          return `El email ya está siendo usado por otro usuario`
        case 'notStrider':
          return `El username ingresado ya está siendo usado por otro usuario`
        case 'pattern':
          if(errors['pattern'].requiredPattern === this.emailPattern) return `El valor ingresado no luce como un correo electrónico`

          return `Error de patrón contra expresión regular`
        default:
          return `Error no controlado ${key}`
      }
    }

    return null
  }

  static isValid(form: FormGroup, fieldName: string): boolean | null {
    return (!!form.controls[fieldName].errors && form.controls[fieldName].touched)
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if(!form.controls[fieldName]) return null

    const errors = form.controls[fieldName].errors ?? {}

    return this.getTextError(errors)
  }

  static isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return (formArray.controls[index].errors && formArray.controls[index].touched)
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if(formArray.controls.length === 0) return null

    const errors = formArray.controls[index].errors ?? {}

    return this.getTextError(errors)
  }

  static isFieldOneEqualFieldTwo(fieldOne: string, fieldTwo: string) {
    return (formGroup: AbstractControl) => {
      const fieldOneValue = formGroup.get(fieldOne)?.value
      const fieldTwoValue = formGroup.get(fieldTwo)?.value

      return fieldOneValue === fieldTwoValue ? null : { passwordsNotEqual: true }
    }
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep()

    const formValue = control.value

    if(formValue === 'hola@mundo.com') return { emailTaken: true }

    return null
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    const formValue = control.value

    return formValue.toLowerCase() === 'strider' ? { notStrider: true } : null
  }
}
