# Angular Plaid Link

### A directive to support Plaid Link in Angular.
[Interfaces & Types](https://github.com/danielzen/ng-plaid-link/blob/master/src/lib/interfaces.ts) support [Plaid API](https://plaid.com/docs/) version: `2019-05-29` 

Inspired by [ngx-plaid-link](https://www.npmjs.com/package/ngx-plaid-link) by [Mike Roberts](https://github.com/mike-roberts)
### How to use

#### 1) Install from NPM

```shell
$ npm install ng-plaid-link
```

#### 2) Import the PlaidLinkModule

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";

import { AppComponent } from './app.component';
import { PlaidLinkModule } from 'ng-plaid-link';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PlaidLinkModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```    

#### 3) add the `zenPlaidLink` Directives to an Element of your choice

```html
<button zenPlaidLink
  env="sandbox"
  publicKey="YOURPUBLICKEY"
  [countryCodes]="['US']"
  (success)="onPlaidSuccess($event)"
  (exit)="onPlaidExit($event)"
  (load)="onPlaidLoad($event)"
  (event)="onPlaidEvent($event)"
>Link Your Bank Account</button>
```

#### Other options:

Note that most of the functionality is available through the `PlaidLinkService`, so you could implement functionality yourself if you wanted to customize further

```typescript
import { Component, AfterViewInit } from "@angular/core";
import {
  PlaidConfig,
  PlaidLinkService,
  PlaidLinkHandler
} from "ng-plaid-link";
                            
@Component({
  selector: 'app-plaid-component',
  templateUrl: './plaid.component.html',
  styleUrls: ['./plaid.component.scss'],
})
export class PlaidLinkComponent implements AfterViewInit {
  private plaidLinkHandler: PlaidLinkHandler;

  private config: PlaidConfig = {
    apiVersion: "v2",
    env: "sandbox",
    product: ["auth"],
    countryCodes: ['US'],
    key: "YOURPUBLICKEY"
  };

  constructor(private plaidLinkService: PlaidLinkService) {}

  // Create and open programmatically once the library is loaded.
  async ngAfterViewInit() {
    this.plaidLinkHandler = await this.plaidLinkService
      .createPlaid(
        Object.assign({}, this.config, {
          onSuccess: (token, metadata) => this.onSuccess(token, metadata),
          onExit: (error, metadata) => this.onExit(error, metadata),
          onEvent: (eventName, metadata) => this.onEvent(eventName, metadata)
        })
      );
    this.open();
  }

  open() {
    this.plaidLinkHandler.open();
  }

  exit() {
    this.plaidLinkHandler.exit();
  }

  onSuccess(token, metadata) {
    console.log("We got a token:", token);
    console.log("We got metadata:", metadata);
  }

  onEvent(eventName, metadata) {
    console.log("We got an event:", eventName);
    console.log("We got metadata:", metadata);
  }

  onExit(error, metadata) {
    console.log("We exited:", error);
    console.log("We got metadata:", metadata);
  }
}
```

#### Available Configuration Options

This mirrors Plaid's [Parameter reference](https://plaid.com/docs/#parameter-reference).

| Attribute/prop         | input/output | optional/required | Type                    | Default                       | Description                                                                                                                         |
| --------------         | ------------ | ----------------- | --------                | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| apiVersion             | input        | optional          | string                  | v2                            | The version of the Plaid Link api to use                                                                                            |
| clientName             | input        | required          | string                  | null                          | The name of your application, gets used in the Plaid Link UI.                                                                       |
| product                | input        | optional          | PlaidProductType[]      | ['auth']                      | An array of the names of the products you'd like to authorize. Available options are `transactions`, `auth`, and `identity`.        |
| accountSubtypes        | input        | optional          | PlaidAccountSubtypes    | null                          | Filtering Accounts and Institutions by Account Subtype                                                                    |
| publicKey              | input        | required          | string                  | null                          | The public key from your Plaid account _Make sure it's the public key and not the private key_                                      |
| env                    | input        | optional          | string                  | sandbox                       | Can be one of available plaid environments: `sandbox`, `development`, or `production`                                               |
| success                | output       | required          | function                | n/a                           | Passes the result from the onSuccess function to your component                                                                     |
| exit                   | output       | required          | function                | n/a                           | Passes the result from the onExit function to your component                                                                        |
| event                  | output       | optional          | function                | n/a                           | Passes the result from the onEvent function to your component                                                                       |
| load                   | output       | optional          | function                | n/a                           | Lets you act on the event once Plaid Link library is all loaded                                                                     |
| language               | input        | optional          | PlaidSupportedLanguage  | en                            | Specify a Plaid-supported language to localize Link. English will be used by default.                                               |
| countryCodes           | input        | optional          | PlaidSupportedCountry[] | ['US']                        | An array of strings of [Plaid supported country codes](https://plaid.com/docs/faq/#does-plaid-support-international-bank-accounts-) |
| webhook                | input        | optional          | string                  | null                          | You can provide a webhook for each item that Plaid will send events to.                                                             |
| token                  | input        | optional          | string                  | null                          | You can provide a token if you are re-authenticating or updating an item that has previously been linked.                           |
| isWebview              | input        | optional          | boolean                 | null                          | Set to true if launching Link within a WebView                                                                                      |
| linkCustomizationName  | input        | optional          | string                  | null                          | You can provide a webhook for each item that Plaid will send events to.                                                             |
| oauthNonce             | input        | optional          | string                  | null                          | An oauthNonce is required to support OAuth authentication flows when launching or re-launching Link on a mobile device              |
| oauthRedirectUri       | input        | optional          | string                  | null                          | An oauthRedirectUri is required to support OAuth authentication flows when launching Link on a mobile device                        |
| oauthStateId           | input        | optional          | string                  | null                          | An oauthStateId is required to support OAuth authentication flows when re-launching Link on a mobile device                         |
| paymentToken           | input        | optional          | string                  | null                          | A paymentToken must be specified if you are using the payment_initiation product.                                                   |

