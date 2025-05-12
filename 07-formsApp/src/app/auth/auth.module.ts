import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { EmailValidator, ReactiveFormsModule } from '@angular/forms';

import { RegisterPageComponent } from './pages/register-page/register-page.component';


@NgModule({
  declarations: [
    RegisterPageComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
