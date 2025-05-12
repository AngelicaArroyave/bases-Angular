import { Component, signal } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name: 'Andres',
  gender: 'male',
  age: 25,
  country: 'Canada',
  state: 'Ontario'
}
const client2 = {
  name: 'Angie',
  gender: 'female',
  age: 35,
  country: 'Canada',
  state: 'Quebec'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [
    CardComponent,
    I18nSelectPipe,
    I18nPluralPipe,
    SlicePipe,
    JsonPipe,
    UpperCasePipe,
    KeyValuePipe,
    TitleCasePipe,
    AsyncPipe
  ],
  templateUrl: './uncommon-page.component.html'
})
export default class UncommonPageComponent {
  client = signal(client1)
  clients = signal(['Maria', 'Juan', 'Pedro', 'Andrea', 'Angie', 'Fernando', 'Juan', 'Luisa'])

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }
  clientsMap = signal({
    '=0': 'no people waiting',
    '=1': 'is one person waiting',
    other: 'are # people waiting'
  })
  profile = {
    name: 'Andrea',
    age: 15,
    country: 'Canada',
    state: 'Ottawa'
  }

  changeClient() {
    if(this.client() === client1) {
      this.client.set(client2)
      return
    }

    this.client.set(client1)
  }

  deleteClient() {
    this.clients.update(previous => previous.slice(1))
  }

  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('We have data on the promise')
    }, 3500)
  })

  myObservableTimer = interval(2000).pipe(
    map(value => value + 1),
    tap(value => console.log(value))
  )
}
