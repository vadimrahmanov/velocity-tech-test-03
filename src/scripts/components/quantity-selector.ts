const initQuantitySelector = (): void => {
  const qtySelectorEls = document.querySelectorAll<HTMLDivElement>('[data-qty-selector]');
  if (!qtySelectorEls.length) return;

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

  qtySelectorEls.forEach((selector): void => {
    const inputEl = selector.querySelector<HTMLInputElement>('[data-qty-input]');
    const buttonEls = selector.querySelectorAll<HTMLButtonElement>('[data-qty-button]');
    if (!inputEl || !buttonEls.length) return;

    updateButtons(inputEl);

    buttonEls.forEach((btn): void => {
      const buttonType = btn.getAttribute('data-qty-button');
      btn.addEventListener('click', (): void => {
        changeQuantity(inputEl, buttonType === 'increase' ? 1 : -1);
        inputEl.dispatchEvent(new Event('change'));
      });
    });
    inputEl.addEventListener('change', (): void => changeQuantity(inputEl));
  });
};

export default initQuantitySelector;
