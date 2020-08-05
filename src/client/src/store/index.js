import Vue from 'vue';
import Vuex from 'vuex';
import api from '../utils/api';

import cartModule from './cart.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        pizzas: [],
        currency: 'usd'
    },
    mutations: {
        SET_PIZZAS(state, payload) {
            state.pizzas = payload;
        },
        TOGGLE_CURRENCY(state) {
            state.currency = state.currency === 'usd' ? 'eur' : 'usd';
        }
    },
    actions: {
        async getPizzas({ commit }) {
            const pizzas = (await api.get('/pizza')).data;
            commit('SET_PIZZAS', pizzas);
        },
        toggleCurrency({ commit }) {
            commit('TOGGLE_CURRENCY');
        }
    },
    getters: {
        pizzas: ({ pizzas }) => pizzas,
        currency: ({ currency }) => currency
    },
    modules: {
        cart: cartModule
    }
});

export default store;
