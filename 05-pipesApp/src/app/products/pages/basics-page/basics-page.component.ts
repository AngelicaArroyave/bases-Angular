import { Component } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrls: ['./basics-page.component.css']
})
export class BasicsPageComponent {

  public nameLower: string = 'superman'
  public nameUpper: string = 'SUPERMAN'
  public fullName: string = 'lA mUjeR MAraViLLa'

  public customDate: Date = new Date()
}
