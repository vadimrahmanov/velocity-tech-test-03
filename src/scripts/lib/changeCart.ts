import getCart from './getCart';
import updateCartCount from './updateCartCount';

interface ChangeCartItem {
  id: string; // line item key
  quantity: number;
}

interface ChangeCartResponse {
  id: string;
  quantity: number;
}

const changeCart = async (lineItemKey: string, qty: number): Promise<ChangeCartResponse | undefined> => {
  const item: ChangeCartItem = {
    id: lineItemKey,
    quantity: qty,
  };

  try {
    const response = await fetch(`${window.Shopify.routes.root}cart/change.js`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    const cart = await getCart();
    if (cart) {
      updateCartCount(cart.item_count);
    }

    return (await response.json()) as ChangeCartResponse;
  } catch (err) {
    console.error('Change cart error:', err);
    throw err;
  }
};

export default changeCart;
