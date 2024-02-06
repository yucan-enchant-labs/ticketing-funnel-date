declare global {
  interface Window {
    _env_: {
      REACT_APP_LOGIN_LINK: string | undefined;
      REACT_APP_SERVER_URL: string | undefined;
      REACT_APP_CODES_PORTAL_URL: string | undefined;
      REACT_APP_NOTIFICATIONS_PORTAL_URL: string | undefined;
      REACT_APP_STRIPE: string | undefined;
      REACT_APP_STRIPE_ACCOUNT: string | undefined;
      REACT_APP_TICKETS_URL: string | undefined;
      REACT_APP_API_URL: string | undefined;
      REACT_APP_TIX_URL: string | undefined;
      REACT_APP_REFERRAL_URL: string | undefined;
      REACT_APP_APPLE_WALLET_URL: string | undefined;
      REACT_APP_GOOGLE_WALLET_URL: string | undefined;
    };
    Intercom: any;
    intercomSettings?: any;
  }
}

export const SERVER_URL =
  typeof window !== 'undefined' && window._env_ ? window._env_.REACT_APP_SERVER_URL : process.env.REACT_APP_SERVER_URL;

export const STRIPE =
  typeof window !== 'undefined' && window._env_ ? window._env_.REACT_APP_STRIPE : process.env.REACT_APP_STRIPE;

export const STRIPE_ACCOUNT =
  typeof window !== 'undefined' && window._env_
    ? window._env_.REACT_APP_STRIPE_ACCOUNT
    : process.env.REACT_APP_STRIPE_ACCOUNT;

export const TICKETS_URL =
  typeof window !== 'undefined' && window._env_
    ? window._env_.REACT_APP_TICKETS_URL
    : process.env.REACT_APP_TICKETS_URL;

export const API_URL =
  typeof window !== 'undefined' && window._env_ ? window._env_.REACT_APP_API_URL : process.env.REACT_APP_API_URL;

export const TIX_URL =
  typeof window !== 'undefined' && window._env_ ? window._env_.REACT_APP_TIX_URL : process.env.REACT_APP_TIX_URL;

export const REFERRAL_URL =
  typeof window !== 'undefined' && window._env_
    ? window._env_.REACT_APP_REFERRAL_URL
    : process.env.REACT_APP_REFERRAL_URL;

export const GOOGLE_WALLET_URL =
  typeof window !== 'undefined' && window._env_
    ? window._env_.REACT_APP_GOOGLE_WALLET_URL
    : process.env.REACT_APP_GOOGLE_WALLET_URL;

export const APPLE_WALLET_URL =
  typeof window !== 'undefined' && window._env_
    ? window._env_.REACT_APP_APPLE_WALLET_URL
    : process.env.REACT_APP_APPLE_WALLET_URL;
