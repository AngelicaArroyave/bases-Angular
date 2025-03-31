import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html'
})
export class SearchInputComponent {
  placeholder = input<string>('Search')
  searchValue = output<string>()

  onSearch(value: string) {
    this.searchValue.emit(value)
  }
}
