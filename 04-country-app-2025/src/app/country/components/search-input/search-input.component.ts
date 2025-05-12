import { Component, effect, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html'
})
export class SearchInputComponent {
  placeholder = input<string>('Search')
  debounceTime = input(300)
  initialValue = input<string>()
  searchValue = output<string>()

  inputValue = linkedSignal<string>(() =>this.initialValue() ?? '')

  debounceEffect = effect(onCleanup => {
    const value = this.inputValue()
    const timeout = setTimeout(() => {
      this.searchValue.emit(value)
    }, this.debounceTime())

    onCleanup(() => clearTimeout(timeout))
  })

  onSearch(value: string) {
    this.searchValue.emit(value)
  }
}
