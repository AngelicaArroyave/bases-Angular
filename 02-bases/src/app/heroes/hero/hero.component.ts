import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {

  public name: string = 'ironman'
  public age: number = 45

  get capitalizedName(): string {
    return this.name.toUpperCase()
  }

  getHeroDescription(): string {
    return `${ this.name } - ${ this.age }`
  }

  // Método que cambia el nombre
  changeHero(): void {
    this.name = 'spiderman'
  }

  // Método que cambia la edad
  changeAge(): void {
    this.age = 30
  }

  // Método para restablecer los valores
  resetForm(): void {
    this.name = 'ironman'
    this.age = 45
  }
}
