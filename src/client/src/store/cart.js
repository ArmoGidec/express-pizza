import api from '../utils/api';

const state = {
    cart: []
};

/**
 * @type {import('vuex').MutationTree<state>}
 */
const mutations = {
    SET_CART(state, payload) {
        state.cart = payload;
    },
    ADD_TO_CART(state, payload) {
        const { count, ...item } = payload;
        const items = Array(count).fill().map(() => ({ ...item }));
        state.cart = state.cart.concat(items);
    }
};

/**
 * @type {import('vuex').ActionTree<state>}
 */
const actions = {
    async getCart({ commit }) {
        const cart = (await api.get('/cart')).data;
        commit('SET_CART', cart);
        return cart;
    },
    addToCart({ commit, dispatch }, item) {
        commit('ADD_TO_CART', item);
        return dispatch('setCart');
    },
    setCart({ state }) {
        return api.post('/cart/set', state.cart);
    }
};

/**
 * @type {import('vuex').GetterTree<state>}
 */
const getters = {
    cart: ({ cart }) => cart
};

export default { state, mutations, actions, getters };
