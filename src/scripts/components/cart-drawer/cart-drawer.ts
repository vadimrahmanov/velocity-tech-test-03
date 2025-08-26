import initCartLineItem from './cart-line-item';
import renderCartDrawer from './render-cart-drawer';

const initCartDrawer = (): void => {
  const cartDrawerTriggerEl = document.querySelector<HTMLAnchorElement>('[data-cart-drawer-trigger]');
  const cartDrawerEl = document.querySelector<HTMLElement>('[data-cart-drawer]');
  if (!cartDrawerTriggerEl || !cartDrawerEl) return;
  const cartDrawerCloseEl = cartDrawerEl.querySelector<HTMLButtonElement>('[data-cart-drawer-close]');
  const cartDrawerOverlayEl = document.querySelector<HTMLDivElement>('[data-cart-drawer-overlay]');

  const closeCartDrawer = (): void => {
    cartDrawerEl.classList.remove('cart-drawer--open');
    cartDrawerTriggerEl.setAttribute('aria-expanded', String(false));
    cartDrawerCloseEl?.removeEventListener('click', closeCartDrawer);
    cartDrawerOverlayEl?.removeEventListener('click', closeCartDrawer);
  };

  const openCartDrawer = (evt: Event): void => {
    evt.preventDefault();
    cartDrawerEl.classList.add('cart-drawer--open');
    cartDrawerTriggerEl.setAttribute('aria-expanded', String(true));
    cartDrawerCloseEl?.focus(); // focus to cart drawer for accessibility
    cartDrawerCloseEl?.addEventListener('click', closeCartDrawer);
    cartDrawerOverlayEl?.addEventListener('click', closeCartDrawer);
  };

  cartDrawerTriggerEl.addEventListener('click', openCartDrawer);
  // Escape button close cart drawer
  document.addEventListener('keydown', (evt: KeyboardEvent): void => {
    if (evt.key === 'Escape') {
      closeCartDrawer();
    }
  });
  renderCartDrawer();
  initCartLineItem(cartDrawerEl);
};

export default initCartDrawer;
