export interface PlaidConfig {
  apiVersion?: string;
  clientName: string;
  product: PlaidProductType[];
  accountSubtypes?: PlaidAccountSubtypes
  key: string;
  env: string;
  onSuccess: Function;
  onExit?: Function;
  onEvent?: Function;
  onLoad?: Function;
  language?: PlaidSupportedLanguage
  countryCodes?: PlaidSupportedCountry[];
  webhook?: string;
  token?: string;
  isWebview?: boolean,
  linkCustomizationName?: string,
  oauthNonce?: string,
  oauthRedirectUri?: string,
  oauthStateId?: string,
  paymentToken?: string
}

export interface PlaidOnSuccessArgs {
  token: string;
  metadata: PlaidSuccessMetadata;
}

export interface PlaidSuccessMetadata {
  link_session_id: string;
  institution: PlaidInstitution;
  account: PlaidAccount;
  accounts: PlaidAccount[];
  account_id: string;
  public_token: string;
}

export interface PlaidInstitution {
  name: string;
  institution_id: string;
}

export interface PlaidAccount {
  id: string;
  name: string;
  mask: string;
  type: string;
  subtype: string;
}

export interface PlaidError {
  display_message: string;
  error_code: string;
  error_message: string;
  error_type: string;
}

export interface PlaidErrorMetadata {
  link_session_id: string;
  institution: PlaidInstitution;
  status: string;
}

export interface PlaidOnExitArgs {
  error: PlaidError;
  metadata: PlaidErrorMetadata;
}

export interface PlaidOnEventArgs {
  eventName: string;
  metadata: PlaidEventMetadata;
}

export interface PlaidEventMetadata {
  error_code: string;
  error_message: string;
  error_type: string;
  exit_status: string;
  institution_id: string;
  institution_name: string;
  institution_search_query: string;
  request_id: string;
  link_session_id: string;
  mfa_type: string;
  view_name: string;
  timestamp: string;
}

export interface PlaidAccountSubtypes {
  investment?: PlaidInvestmentAccountSubtype[];
  credit?: PlaidCreditAccountSubtype[];
  depository?: PlaidDepositoryAccountSubtype[];
  loan?: PlaidLoanAccountSubtype[];
  other?: PlaidOtherAccountSubtype[];
}

export type PlaidSupportedLanguage = 'en' | 'fr' | 'es' | 'nl';

export type PlaidSupportedCountry = 'CA' | 'FR' | 'IE' | 'NL' | 'ES' | 'GB' | 'US'

export type PlaidProductType = 'transactions' |
  'auth' |
  'identity' |
  'income' |
  'assets' |
  'investments' |
  'liabilities' |
  'payment_initiation'

export type PlaidCreditAccountSubtype = 'credit card' | 'paypal';

export type PlaidLoanAccountSubtype =
  'auto' |
  'commercial' |
  'construction' |
  'consumer' |
  'home' |
  'home equity' |
  'loan' |
  'mortgage' |
  'overdraft' |
  'line of credit' |
  'student'

// noinspection SpellCheckingInspection
export type PlaidInvestmentAccountSubtype =
  '401a' |
  '401k' |
  '403B' |
  '457b' |
  '529' |
  'brokerage' |
  'cash isa' |
  'education savings account' |
  'gic' |
  'health reimbursement arrangement' |
  'hsa' |
  'isa' |
  'ira' |
  'lif' |
  'lira' |
  'lrif' |
  'lrsp' |
  'mutual fund' |
  'non-taxable brokerage account' |
  'other' |
  'prif' |
  'rdsp' |
  'resp' |
  'rlif' |
  'rrif' |
  'pension' |
  'profit sharing plan' |
  'retirement' |
  'roth' |
  'roth 401k' |
  'rrsp' |
  'sep ira' |
  'simple ira' |
  'sipp' |
  'stock plan' |
  'thrift savings plan' |
  'tfsa' |
  'trust' |
  'ugma' |
  'utma' |
  'variable annuity'

export type PlaidDepositoryAccountSubtype =
  'cd' |
  'checking' |
  'hsa' |
  'savings' |
  'money market' |
  'paypal' |
  'prepaid'

// noinspection SpellCheckingInspection
export type PlaidOtherAccountSubtype =
  'cash management' |
  'keogh' |
  'prepaid' |
  'recurring' |
  'rewards' |
  'safe deposit' |
  'sarsep' |
  'other'

// For future development:
export interface PlaidLiabilityAccountType {
  credit?: 'credit card' | 'paypal';
  loan?: 'student'
}
