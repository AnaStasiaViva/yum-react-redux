export const Types = {
  ADD_TO_CART: "CART@ITEMS:ADD_TO_CART",
  REDUCE_ITEM: "CART@ITEMS:MINUS",
  INCREASE_ITEM: "CART@ITEMS:PLUS",
  REMOVE_ITEMS_BY_ID: "CART@ITEMS:REMOVE_ITEMS_BY_ID",
  CLEAR_ITEMS: "CART@ITEMS:CLEAR",
};

const Actions = {
  addToCart:
    ({ id, type, size }) =>
    (dispatch, getState) => {
      const pizzas = getState().pizzas.items;
      const pizzaObj = pizzas.find((obj) => obj.id === id);

      dispatch({
        type: Types.ADD_TO_CART,
        payload: {
          id: pizzaObj.id,
          imageUrl: pizzaObj.imageUrl,
          name: pizzaObj.name,
          price: pizzaObj.price,
          type,
          size,
        },
      });
    },
  plusItem: (id) => ({
    type: Types.INCREASE_ITEM,
    payload: id,
  }),
  minusItem: (id) => ({
    type: Types.REDUCE_ITEM,
    payload: id,
  }),
  removeItemsById: (id) => ({
    type: Types.REMOVE_ITEMS_BY_ID,
    payload: Number(id),
  }),
  clearItems: {
    type: Types.CLEAR_ITEMS,
  },
};

export default Actions;
