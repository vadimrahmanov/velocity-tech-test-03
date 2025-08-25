interface CartItem {
  id: number;
  quantity: number;
  title: string;
  variant_id: number;
  [key: string]: unknown;
}

interface ShopifyCart {
  token: string;
  note: string | null;
  attributes: Record<string, unknown>;
  original_total_price: number;
  total_price: number;
  total_discount: number;
  items: CartItem[];
  item_count: number;
  [key: string]: unknown;
}

const getCart = async (): Promise<ShopifyCart | undefined> => {
  try {
    const cart = await fetch(`${window.Shopify.routes.root}cart.js`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!cart.ok) {
      throw new Error(`HTTP error! Status: ${cart.status}`);
    }

    const data: ShopifyCart = await cart.json();
    return data;
  } catch (err) {
    console.error('Get cart error:', err);
  }
};

export default getCart;
