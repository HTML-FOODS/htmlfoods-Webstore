export const state = () => ({
    cart: [],
});
export const getters = {
    cartItemCount(state) {
        return state.cart.length;
    },

    cartTotalPrice(state) {
        let total = 0;

        state.cart.forEach((item) => {
            total += item.product.price * item.quantity;
        });

        return total;
    },
}
export const mutations = {
    ADD_TO_CART(
        state,
        { product, quantity, product_name, initial_cost, preprice }
    ) {
        let productInCart = state.cart.find((item) => {
            return item.product._id === product._id;
        });

        if (productInCart) {
            productInCart.quantity += quantity;
            return;
        }

        state.cart.push({
            product,
            quantity,
            product_name,
            initial_cost,
            preprice,
        });
    },
    SET_CART(state, cartItems) {
        state.cart = cartItems;
    },
    REMOVE_PRODUCT_FROM_CART(state, product) {
        state.cart = state.cart.filter((item) => {
            return item.product._id !== product._id;
        });
    },
    UPDATE_CART(state, { product, quantity }) {
        // let Product = state.cart.findIndex((item) => {
        //     item.product._id === product._id;
        // });
        // console.log("index:::::", Product + 1);

        // state.cart[Product + 1].quantity = quantity

        let productInCart = state.cart.find((item) => {
            return item.product._id === product._id;
        });

        if (productInCart) {
            productInCart.quantity = quantity;
            return;
        }
    },

    CLEAR_CART_ITEMS(state) {
        state.cart = [];
    },
};

export const actions = {
    addProductToCart: (
        { commit },
        { product, quantity, product_name, initial_cost, preprice }
    ) => {
        commit("ADD_TO_CART", {
            product,
            quantity,
            product_name,
            initial_cost,
            preprice,
        });
    },
    removeProductFromCart: ({ commit }, product) => {
        commit("REMOVE_PRODUCT_FROM_CART", product);
    },
    updateCart: ({ commit }, { product, quantity }) => {
        commit("UPDATE_CART", { product, quantity });
    },
    clearCartItems: ({ commit }) => {
        commit("CLEAR_CART_ITEMS");
    },
    // checkOut: ({ commit }, { $axios, $router }) => {
    //   return $axios.put(`/v1/product/cart/${this.$route.params.id}`, {
    //     product_name: this.singleProduct.name,
    //     number: this.quantity,
    //     initial_cost: this.singleProduct.cost,
    //     preprice: this.singleProduct.cover,
    //   });
    // },
};