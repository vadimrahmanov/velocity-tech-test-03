import clearCart from '../../lib/clearCart';
import changeCart from '../../lib/changeCart';
import renderCartDrawer from './render-cart-drawer';
import { DOM } from '../../utils/constants';
import syncCollectionCart from '../../lib/syncCollectionCart';

const initCartLineItem = (container: HTMLElement): void => {
  // Toggle loading state on a line item
  const setItemLoadingState = (element: HTMLElement, loading: boolean): void => {
    const lineItemEl = element.closest<HTMLDivElement>('[data-cart-line-item]');
    if (!lineItemEl) return;
    lineItemEl.classList.toggle('cart-line-item--loading', loading);
  };

  // Remove single cart line item function
  const removeLineItem = async (btn: HTMLButtonElement): Promise<void> => {
    setItemLoadingState(btn, true);

    const lineItemKey = String(btn.dataset.cartLineItemRemove);
    if (!lineItemKey) return;

    await changeCart(lineItemKey, 0);
    await renderCartDrawer(); // render new content in cart drawer
    await syncCollectionCart(); // sync cart items with collection page inputs
  };

  // Clear all cart function
  const removeAllItems = async (): Promise<void> => {
    const cartLineItemEls = container.querySelectorAll<HTMLDivElement>('[data-cart-line-item]');
    cartLineItemEls.forEach((lineItemEl): void => setItemLoadingState(lineItemEl, true));

    await clearCart();
    await renderCartDrawer(); // render new content in cart drawer
    await syncCollectionCart(); // sync cart items with collection page inputs
  };

  // Handle quantity change for a line item
  const updateQuantity = async (input: HTMLInputElement): Promise<void> => {
    setItemLoadingState(input, true);

    const lineItemKey = String(input.dataset.qtyLineItemKey);
    if (!lineItemKey) return;

    await changeCart(lineItemKey, Number(input.value));
    await renderCartDrawer(); // render new content in cart drawer
    await syncCollectionCart(); // sync cart items with collection page inputs
  };

  // Delegated clicks for clear all and single line item remove
  container.addEventListener('click', (evt: Event): void => {
    const target = evt.target as HTMLElement;
    if (target === null) return;

    const removeBtn = target.closest<HTMLButtonElement>('[data-cart-line-item-remove]');
    if (removeBtn) {
      removeLineItem(removeBtn);
      return;
    }

    const clearBtn = target.closest<HTMLButtonElement>('[data-cart-drawer-clear]');
    if (clearBtn) {
      removeAllItems();
    }
  });

  // Quantity input delegated change
  container.addEventListener('change', (evt: Event): void => {
    const input = (evt.target as HTMLElement).closest<HTMLInputElement>(DOM.QTY_INPUT);
    if (input) updateQuantity(input);
  });
};

export default initCartLineItem;
