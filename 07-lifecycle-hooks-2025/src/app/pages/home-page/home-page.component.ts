import { afterNextRender, afterRender, Component, effect, OnChanges, OnInit, signal } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';

const log = (...messages: string[]) => {
  console.log(`${messages[0]} %c${messages.slice(1).join(',')}`, 'color: #bada55')
}

@Component({
  selector: 'app-home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.component.html'
})
// Con el implements se fuerza u obliga a implementar ciertos métodos de la interfaz
export class HomePageComponent implements OnInit, OnChanges {
  traditionalProperty: string = 'Angie'
  signalProperty = signal('Angie')

  constructor() {
    log('HomePageComponent constructor called')

    // setTimeout(() => {
    //   this.signalProperty.set('Dae')
    // }, 2000);
  }

  changeTraditionalProperty() {
    this.traditionalProperty = 'John'
  }

  changeSignalProperty() {
    this.signalProperty.set('John')
  }

  basicEffect = effect(onCleanup => {
    log('effect', `Triggering side effect.`)

    onCleanup(() => {
      log('onCleanup', `Executed when the component is destroyed.`)
    })
  })

  ngOnInit() {
    log('ngOnInit', `Runs once after Angular has initialized all the component's inputs.`)
  }

  ngOnChanges() {
    log('ngOnChanges', `Runs every time the component's inputs have changed.`)
  }

  ngDoCheck() {
    log('ngDoCheck', `Runs every time this component is checked for changes.`)
  }

  ngAfterContentInit() {
    log('ngAfterContentInit', `Runs once after the component's content has been initialized.`)
  }

  ngAfterContentChecked() {
    log('ngAfterContentChecked', `Runs every time this component content has been checked for changes.`)
  }

  ngAfterViewInit() {
    log('ngAfterViewInit', `Runs once after the component's view has been initialized.`)
  }

  ngAfterViewChecked() {
    log('ngAfterViewChecked', `Runs every time the component's view has been checked for changes.`)
  }

  ngOnDestroy() {
    log('ngOnDestroy', `Runs once before the component is destroyed.`)
  }

  afterNextRenderEffect = afterNextRender(() => {
    log('afterNextRender', `	Runs once the next time that all components have been rendered to the DOM.`)
  })

  afterRenderEffect = afterRender(() => {
    log('afterRender', `Runs every time all components have been rendered to the DOM.`)
  })
}
