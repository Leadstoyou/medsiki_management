import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonsRoutingModule } from './commons-routing.module';
import { ErrorComponent } from './error/error.component';
import { ShareModule } from '#components/share/share.module';

@NgModule({
  declarations: [ErrorComponent],
  imports: [CommonModule, CommonsRoutingModule, ShareModule],
})
export class CommonsModule {}
