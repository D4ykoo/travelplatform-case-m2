export const environment = {
  production: false,
  Monitor_API:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window['env' as any]['Monitor_API' as any] ||
    'http://localhost:8088/api/v1/',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug: window['env' as any]['DEBUG_FR' as any] || false,
  Checkout_URL:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window['env' as any]['CHECKOUT_URL' as any] || 'http://localhost:8083/',
  Login_URL:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window['env' as any]['LOGIN_URL' as any] || 'http://localhost:8081/',
  Travel_URL:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window['env' as any]['TRAVEL_URL' as any] || 'http://localhost:8085/',
};
