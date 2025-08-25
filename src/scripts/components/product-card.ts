import initQuantitySelector from './quantity-selector';
import addCart from '../lib/addCart';
import changeCart from '../lib/changeCart';

const initProductCard = (): void => {
  const productCardEls = document.querySelectorAll<HTMLElement>('[data-product-card]');
  if (!productCardEls.length) return;

  const changeProductQty = async (input: HTMLInputElement, state: { inCart: boolean }, variantId: number): Promise<void> => {
    const currentValue = Number(input.value);
    const qtySelector = input.parentElement;

    // Loading state function to disable qty selector and show spinner
    const setLoadingState = (loading: boolean): void => {
      qtySelector?.classList.toggle('quantity-selector--loading', loading);
    };

    if (!state.inCart && currentValue > 0) { // check if product isn't in the cart and input value more than 0
      setLoadingState(true);
      const addedItem = await addCart(variantId, currentValue); // adding product to the cart

      state.inCart = true; // change state to inCart

      if (addedItem?.key != '') {
        input.dataset.qtyLineItemKey = String(addedItem.key); // set lineItemKey to data-attribute for future managment
      }
      setLoadingState(false);
    }
    else if (state.inCart && input.dataset.qtyLineItemKey != '') { // check if product in the cart and we have lineItemKey
      setLoadingState(true);
      await changeCart(String(input.dataset.qtyLineItemKey), currentValue);
      setLoadingState(false);
    }

    // Reset flag if qty drops to 0
    if (currentValue === 0) {
      state.inCart = false; // change state which indicates that product isn't in the cart
      delete input.dataset.qtyLineItemKey; // delete data-attribute value if product isn't in the cart anymore
    }
  };

  productCardEls.forEach((card): void => {
    const cardQtyInput = card.querySelector<HTMLInputElement>('[data-qty-input]');
    if (!cardQtyInput) return;

    const state = { inCart: Number(cardQtyInput.value) > 0 };
    const variantId = Number(card.dataset.productCard);

    cardQtyInput.addEventListener('change', (): Promise<void> => changeProductQty(cardQtyInput, state, variantId));
  });

  initQuantitySelector();
};

export default initProductCard;
