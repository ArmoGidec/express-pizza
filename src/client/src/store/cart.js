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
    }
};

/**
 * @type {import('vuex').GetterTree<state>}
 */
const getters = {
    cart: ({ cart }) => cart
};

export default { state, mutations, actions, getters };
