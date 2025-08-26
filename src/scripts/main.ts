import init from './utils/init';
import initCartDrawer from './components/cart-drawer/cart-drawer';
import initQuantitySelector from './components/quantity-selector';

init((): void => {
  initCartDrawer();
  initQuantitySelector();
});
