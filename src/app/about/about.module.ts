import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, TranslateModule, AboutRoutingModule, HttpClientModule],
  declarations: [AboutComponent],
})
export class AboutModule {}
