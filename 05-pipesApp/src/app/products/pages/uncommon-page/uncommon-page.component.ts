import { Component } from '@angular/core';
import { Observable, interval, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrls: ['./uncommon-page.component.css']
})
export class UncommonPageComponent {

  // i18n Select
  public name: string = 'Angie'
  public gender: 'male'|'female' = 'female'
  public invitationMap = {
    'male': 'invitarlo',
    'female': 'invitarla'
  }

  changeClient(): void {
    this.name = 'Andrés'
    this.gender = 'male'
  }

  // i18n Plural
  public clients: string[] = ['Gabriela','Melissa','Andrés','Lorenzo','Rita']
  public clientsMap = {
    '=0': 'no tenemos ningún cliente esperando.',
    '=1': 'tenemos un cliente esperando.',
    '=2': 'tenemos 2 clientes esperando.',
    'other': 'tenemos # clientes esperando.'
  }

  deleteClient(): void {
    this.clients.shift()
  }

  // keyValue Pipe
  public person = {
    name: 'Fernanda',
    age: 37,
    address: 'Ottawa, Canada'
  }

  // Async Pipe
  public myObservableTimer: Observable<number> = interval(2000).pipe(
    tap(value => console.log('tap: ', value)
    )
  )

  public promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve('Tenemos data en la promesa')
      console.log('Tenemos data en la promesa')
  }, 3500)
  })
}
