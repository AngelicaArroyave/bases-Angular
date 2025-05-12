import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, LOCALE_ID, signal } from '@angular/core';

import { AvailableLocales, LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [
    LowerCasePipe,
    UpperCasePipe,
    TitleCasePipe,
    DatePipe
  ],
  templateUrl: './basic-page.component.html'
})
export default class BasicPageComponent {
  localeService = inject(LocaleService)
  currentLocale = signal(inject(LOCALE_ID))

  nameLower = signal('angie')
  nameUpper = signal('ANGIE')
  fullName = signal('aNgIe AriAS')

  customDate = signal(new Date())

  tickingDateEffect = effect(() => {
    const interval = setInterval(() => {
      this.customDate.set(new Date())
    }, 1000)
    return () => clearInterval(interval)
  })

  changeLocale(locale: AvailableLocales) {
    this.localeService.changeLocale(locale)
  }
}
