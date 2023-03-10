import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { I18nModule } from '@app/i18n';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, NgbModule, I18nModule, AuthRoutingModule,ToastrModule.forRoot()],
  declarations: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
