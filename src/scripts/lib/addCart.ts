import getCart from './getCart';
import updateCartCount from './updateCartCount';

interface AddCartItem {
  id: number;
  quantity: number;
  selling_plan?: number;
}

interface AddCartResponse {
  id: number;
  quantity: number;
  [key: string]: unknown;
}

const addCart = async (variantId: number, qty: number): Promise<AddCartResponse> => {
  const item: AddCartItem = {
    id: variantId,
    quantity: qty,
  };

  try {
    const atcResponse = await fetch(`${window.Shopify.routes.root}cart/add.js`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    const cart = await getCart();
    if (cart) {
      updateCartCount(cart.item_count);
    }

    return (await atcResponse.json()) as AddCartResponse;
  } catch (err) {
    console.error('Add to cart error:', err);
    throw err;
  }
};

export default addCart;
