import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaidLinkService } from './plaid-link.service';
import { PlaidLinkDirective } from './plaid-link.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    PlaidLinkService
  ],
  declarations: [PlaidLinkDirective],
  exports: [PlaidLinkDirective]
})
export class PlaidLinkModule { }
