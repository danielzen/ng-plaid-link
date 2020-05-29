import { PlaidConfig } from './interfaces';

declare let Plaid: any;

export class PlaidLinkHandler {

  /**
   * Holds the Plaid Link instance.
   */
  private plaidLink: any;

  /**
   * Constructor configures the Plaid Link handler with given config options.
   * @param config
   */
  constructor(config: PlaidConfig) {
    this.plaidLink = Plaid.create(config);
  }

  /**
   * Open the Plaid Link window for this handler.
   * @param institution
   */
  public open(institution?: string): void {
    this.plaidLink.open(institution);
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Closes the currently open Plaid Link window if any.
   */
  public exit(): void {
    this.plaidLink.exit();
  }

}
