import { IProductsInCart } from 'src/types/cart';
// eslint-disable-next-line import-helpers/order-imports
import CreateStore from '~zustand/index';

interface IProductsState {
  numberOfItens: number;
  totalPrice: number;
  cart: Array<IProductsInCart>;
}

interface ISelectItensStore {
  selectedQtdItens: number;
}

const initialStore = {
  cart: [],
  totalPrice: 0,
  numberOfItens: 0,
  selectedQtdItens: 0,
};
const initialSelectedStore = {
  selectedQtdItens: 0,
};

export const useCartStore = CreateStore<IProductsState>(
  () => initialStore,
  'cartStore'
);
export const useSelectItensStore = CreateStore<ISelectItensStore>(
  () => initialSelectedStore,
  'cartStore'
);

export const setQtdItens = (state: number) => {
  useSelectItensStore.setState({
    selectedQtdItens: state,
  });
};

export const setQuantityItens = () => {
  useCartStore.setState((prevState) => ({
    numberOfItens: prevState.cart.length,
  }));
};

export const setProductsInCart = (state: IProductsInCart) => {
  useCartStore.setState((prevState) => ({
    cart: [...prevState.cart, state],
    totalPrice: prevState.totalPrice + state.quantity * state.unitaryValue,
  }));
  setQuantityItens();
};
export const removeProductsInCart = (id: any) => {
  useCartStore.setState((prevState) => {
    const prevCart = prevState.cart;
    prevCart.splice(id, 1);
    return { cart: prevCart };
  });
};
