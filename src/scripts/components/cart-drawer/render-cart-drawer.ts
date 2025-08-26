const renderCartDrawer = async (): Promise<void> => {
  const getCartDrawerMarkup = async (): Promise<string | null> => {
    const cartDrawerSection = `${window.location.origin}?section_id=cart-drawer`;
    try {
      const cartDrawerMarkup = await fetch(cartDrawerSection);
      if (!cartDrawerMarkup.ok) throw new Error(`HTTP error! status: ${cartDrawerMarkup.status}`);
      return await cartDrawerMarkup.text();
    } catch (err) {
      console.error('Failed to fetch cart drawer:', err);
      return null;
    }
  };

  const cartDrawerContent = document.querySelector<HTMLDivElement>('[data-cart-drawer-content]');
  const htmlText = await getCartDrawerMarkup();
  const parser = new DOMParser();
  const doc = parser.parseFromString(String(htmlText), 'text/html');
  const cartDrawerMarkup = doc.querySelector('[data-cart-drawer-section]');
  if (cartDrawerContent && cartDrawerMarkup) {
    cartDrawerContent.innerHTML = cartDrawerMarkup.innerHTML;
  }
};

export default renderCartDrawer;
