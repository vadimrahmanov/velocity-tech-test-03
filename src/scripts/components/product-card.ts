import addCart from '../lib/addCart';
import changeCart from '../lib/changeCart';
import renderCartDrawer from './cart-drawer/render-cart-drawer';
import { DOM } from '../utils/constants';

const initProductCard = (): void => {
  // Product Cards container (I would use something more specific if it would be real project/website)
  const productCardsContainer = document.querySelector<HTMLDivElement>('[data-collection-container]');
  if (!productCardsContainer) return;

  // Delegated inputs for quantity changes
  productCardsContainer.addEventListener('change', async (evt: Event): Promise<void> => {
    const qtyInput = (evt.target as HTMLElement).closest<HTMLInputElement>(DOM.QTY_INPUT);
    if (!qtyInput) return;

    const card = qtyInput.closest<HTMLElement>('[data-product-card]');
    if (!card) return;

    const variantId = Number(card.dataset.productCard); // variant id from data-attribute
    const currentValue = Number(qtyInput.value); // Current quantity input value
    const qtySelector = qtyInput.parentElement;

    // Toggle loading class on the quantity selector
    const setLoadingState = (loading: boolean): void => {
      qtySelector?.classList.toggle('quantity-selector--loading', loading);
    };

    // If product isn't in the cart - we are adding product
    if (!String(qtyInput.dataset.qtyLineItemKey) && currentValue > 0) {
      setLoadingState(true); // show loading state (spinner)
      const addedItem = await addCart(variantId, currentValue);

      // Save line item key to input data attribute for future management
      if (String(addedItem?.key)) {
        qtyInput.dataset.qtyLineItemKey = String(addedItem.key);
      }
      setLoadingState(false);
    }
    // If product is in the cart - we are updating quantity
    else if (String(qtyInput.dataset.qtyLineItemKey)) {
      setLoadingState(true);
      await changeCart(String(qtyInput.dataset.qtyLineItemKey), currentValue);
      setLoadingState(false);
    }

    // Reset if quantity drops to 0
    if (currentValue === 0) {
      qtyInput.dataset.qtyLineItemKey = ''; // remove line item key
    }

    // Update the cart drawer after quantity change
    await renderCartDrawer();
  });
};

export default initProductCard;
