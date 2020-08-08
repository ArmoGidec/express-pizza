import Vue from 'vue';
import Vuex from 'vuex';
import api from '../utils/api';

import cartModule from './cart.js';
import authModule from './auth.js';
import orderModule from './order.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        pizzas: [],
        currency: localStorage.getItem('currency') || 'usd',
    },
    mutations: {
        SET_PIZZAS(state, payload) {
            state.pizzas = payload;
        },
        TOGGLE_CURRENCY(state) {
            state.currency = state.currency === 'usd' ? 'eur' : 'usd';
            localStorage.setItem('currency', state.currency);
        },
    },
    actions: {
        async getPizzas({ commit }) {
            const pizzas = (await api.get('/pizza')).data;
            commit('SET_PIZZAS', pizzas);
        },
        toggleCurrency({ commit }) {
            commit('TOGGLE_CURRENCY');
        },
    },
    getters: {
        pizzas: ({ pizzas }) => pizzas,
        currency: ({ currency }) => currency,
    },
    modules: {
        cart: cartModule,
        user: authModule,
        order: orderModule
    }
});

export default store;
