export { };

declare global {
  interface Window {
    Shopify: {
      routes: {
        root: string;
      };
      [key: string]: unknown;
    };
  }
}