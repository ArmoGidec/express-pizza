import debounce from 'lodash.debounce';
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
    },
    REMOVE_FROM_CART(state, payload) {
        const { _id: id, count } = payload;
        if (count === 1) {
            const index = state.cart.findIndex(({ _id }) => _id === id);
            if (index !== -1) {   
                state.cart.splice(index, 1);
            }
        } else {
            state.cart = state.cart.filter(({ _id }) => _id !== id);
        }
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
        return dispatch('updateCart');
    },
    clearCart({ commit, dispatch }) {
        commit('SET_CART', []);
        dispatch('updateCart');
    },
    removeFromCart({ commit, dispatch }, payload) {
        commit('REMOVE_FROM_CART', payload);
        dispatch('updateCart');
    },
    updateCart: debounce(({ state }) => {
        api.post('/cart/set', state.cart);
    }, 600),
};

/**
 * @type {import('vuex').GetterTree<state>}
 */
const getters = {
    cart: ({ cart }) => cart
};

export default { state, mutations, actions, getters };
