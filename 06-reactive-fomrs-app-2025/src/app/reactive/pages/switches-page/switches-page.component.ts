import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'reactive-switches-page',
  imports: [JsonPipe],
  templateUrl: './switches-page.component.html'
})
export class SwitchesPageComponent { }
