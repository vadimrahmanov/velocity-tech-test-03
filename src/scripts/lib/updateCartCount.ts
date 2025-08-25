const updateCartCount = (count: number): void => {
  const cartCountEl = document.querySelectorAll<HTMLSpanElement>('[data-cart-count]');
  if (!cartCountEl.length) return;
  cartCountEl.forEach((countEl): void => { countEl.textContent = String(count); });
};

export default updateCartCount;
