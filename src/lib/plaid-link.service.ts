import { Injectable } from '@angular/core';
import { PlaidConfig } from './interfaces';
import { PlaidLinkHandler } from './plaid-link-handler';

@Injectable()
export class PlaidLinkService {

  private loaded = false;

  constructor() { }

  /**
   * Create a Plaid Link instance as soon as Plaid Link has loaded.
   * @returns Promise<PlaidLinkHandler>
   * @param config
   */
  public async createPlaid(config: PlaidConfig): Promise<PlaidLinkHandler> {
    this.loaded = await this.loadPlaid();
    return new PlaidLinkHandler(config);
  }

  /**
   * Load or wait for the Plaid Link library to load.
   * @returns Promise<void>
   */
  public async loadPlaid(): Promise<boolean> {
    if (!this.loaded) {
      return new Promise<boolean>((resolve, reject) => {
        const script: any = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
        script.onerror = (e: any) => reject(e);
        if (script.readyState) {  //Internet Explorer
          script.onreadystatechange = () => {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
              script.onreadystatechange = null;
              resolve(true);
            }
          };
        } else script.onload = () => resolve(true);
        document.getElementsByTagName("head")[0].appendChild(script);
      });
    }
    return true;
  }

}
