import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { PlaidLinkHandler } from './plaid-link-handler';
import {
  PlaidErrorMetadata,
  PlaidError,
  PlaidEventMetadata,
  PlaidOnEventArgs,
  PlaidOnExitArgs,
  PlaidOnSuccessArgs,
  PlaidSuccessMetadata, PlaidProductType, PlaidSupportedCountry, PlaidAccountSubtypes, PlaidSupportedLanguage
} from './interfaces';
import { PlaidLinkService } from './plaid-link.service';

function getWindow(): any {
  return window;
}

export interface ICustomWindow extends Window {
  Plaid: {
    create: Function;
  };
}

@Directive({
  selector: '[zenPlaidLink]'
})
export class PlaidLinkDirective {
  @Output() success: EventEmitter<PlaidOnSuccessArgs> = new EventEmitter();
  @Output() exit: EventEmitter<PlaidOnExitArgs> = new EventEmitter();
  @Output() event: EventEmitter<PlaidOnEventArgs> = new EventEmitter();
  @Output() load: EventEmitter<any> = new EventEmitter();

  @Input() clientName: string;
  @Input() publicKey: string;

  @HostBinding('disabled') disabledButton: boolean;

  private plaidLinkHandler: PlaidLinkHandler;
  private defaultProps = {
    apiVersion: "v2",
    env: "sandbox",
    webhook: "",
    product: ["auth"] as PlaidProductType[],
    countryCodes: ["US"] as PlaidSupportedCountry[]
  };

  @Input() apiVersion?: string = this.defaultProps.apiVersion;
  @Input() product?: PlaidProductType[] = this.defaultProps.product as PlaidProductType[];
  @Input() accountSubtypes?: PlaidAccountSubtypes;
  @Input() env?: string = this.defaultProps.env;
  @Input() language?: PlaidSupportedLanguage;
  @Input() countryCodes?: PlaidSupportedCountry[] = this.defaultProps.countryCodes;
  @Input() webhook?: string = this.defaultProps.webhook;
  @Input() token?: string;
  @Input() isWebView?: boolean;
  @Input() linkCustomizationName?: string;
  @Input() oauthNonce?: string;
  @Input() oauthRedirectUri?: string;
  @Input() oauthStateId?: string;
  @Input() paymentToken?: string;

  constructor(private plaidLinkLoader: PlaidLinkService) {
    this.disabledButton = true;
  }

  // noinspection JSUnusedGlobalSymbols
  get nativeWindow(): ICustomWindow {
    return getWindow();
  }

  async ngOnInit() {
    let handler: PlaidLinkHandler = await this.plaidLinkLoader
      .createPlaid({
        apiVersion: "v2",
        clientName: this.clientName,
        product: this.product,
        accountSubtypes: this.accountSubtypes,
        key: this.publicKey,
        env: this.env,
        onSuccess: (public_token, metadata) => this.onSuccess(public_token, metadata),
        onExit: (err, metadata) => this.onExit(err, metadata),
        onEvent: (eventName, metadata) => this.onEvent(eventName, metadata),
        onLoad: () => this.onLoad(),
        countryCodes: this.countryCodes,
        token: this.token || null,
        webhook: this.webhook || null
      });
    this.disabledButton = false;
    this.plaidLinkHandler = handler;
  }

  public onExit(error: PlaidError, metadata: PlaidErrorMetadata) {
    this.exit.emit({error, metadata});
  }

  public onEvent(eventName: string, metadata: PlaidEventMetadata) {
    this.event.emit({eventName, metadata});
  }

  public onSuccess(token: string, metadata: PlaidSuccessMetadata) {
    this.success.emit({token, metadata});
  }

  public onLoad($event = "link_loaded") {
    this.load.emit($event);
  }

  @HostListener('click')
  onClick() {
    if (this.plaidLinkHandler) this.plaidLinkHandler.open();
  }
}
