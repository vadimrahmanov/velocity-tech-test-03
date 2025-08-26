import { DOM } from '../utils/constants';

const initQuantitySelector = (): void => {
  // Enable or disable quantity buttons based on current input value
  const updateButtons = (inputEl: HTMLInputElement): void => {
    const decreaseBtn = inputEl.parentElement?.querySelector<HTMLButtonElement>('[data-qty-button="decrease"]');
    const increaseBtn = inputEl.parentElement?.querySelector<HTMLButtonElement>('[data-qty-button="increase"]');
    if (!decreaseBtn || !increaseBtn) return;

    const currentValue = Number(inputEl.value); // the value currently entered in the input
    const inputMin = Number(inputEl.min); // minimum allowed quantity
    const inputMax = Number(inputEl.max); // maximum allowed quantity

    decreaseBtn.disabled = currentValue <= inputMin; // disable - button if quantity below minimum
    increaseBtn.disabled = currentValue >= inputMax; // disable + button if quantity above maximum
  };

  // Change quantity function
  const changeQuantity = (inputEl: HTMLInputElement, delta = 0): void => {
    const inputMin = Number(inputEl.min); // minimum allowed quantity
    const inputMax = Number(inputEl.max); // maximum allowed quantity

    let currentValue = Number(inputEl.value);
    currentValue += delta;
    if (currentValue < inputMin) currentValue = inputMin; // check if value is not below the input's min
    if (currentValue > inputMax) currentValue = inputMax; // check if value does not exceed available stock

    inputEl.value = String(currentValue);
    updateButtons(inputEl);
  };

  // Delegated click handler for +/-
  document.addEventListener('click', (evt: Event): void => {
    const target = evt.target as HTMLElement;
    const qtyButton = target.closest<HTMLButtonElement>('[data-qty-button]');
    if (!qtyButton) return;

    const qtySelector = qtyButton.closest<HTMLElement>('[data-qty-selector]');
    const inputEl = qtySelector?.querySelector<HTMLInputElement>(DOM.QTY_INPUT);
    if (!inputEl) return;

    const buttonType = qtyButton.dataset.qtyButton; // get button type (+ or -)
    const delta = buttonType === 'increase' ? 1 : -1; // increment +1 if increase, otherwise -1

    changeQuantity(inputEl, delta);
    inputEl.dispatchEvent(new Event('change', { bubbles: true })); // dispatch event for dependent elements such as product card, cart drawer line item. "bubbles" is set to true, so that event could bubbles from the target element to its parent elements.
  });

  // Delegated change handler
  document.addEventListener('change', (evt: Event): void => {
    const target = evt.target as HTMLElement;
    const inputEl = target.closest<HTMLInputElement>(DOM.QTY_INPUT);
    if (!inputEl) return;

    changeQuantity(inputEl);
  });

  // Initial sync for all selectors
  const qtyInputEls = document.querySelectorAll<HTMLInputElement>(DOM.QTY_INPUT);
  qtyInputEls.forEach((inputEl): void => updateButtons(inputEl));
};

export default initQuantitySelector;
