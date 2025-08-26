import getCart from './getCart';
import updateCartCount from './updateCartCount';

const clearCart = async (): Promise<void> => {
  try {
    const clearCart = await fetch(`${window.Shopify.routes.root}cart/clear.js`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!clearCart.ok) {
      throw new Error(`HTTP error! Status: ${clearCart.status}`);
    }

    const cart = await getCart();
    if (cart) {
      updateCartCount(cart.item_count);
    }

    return await clearCart.json();
  } catch (err) {
    console.error('Cart clear error:', err);
  }
};

export default clearCart;
