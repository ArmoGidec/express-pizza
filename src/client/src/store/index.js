import Vue from 'vue';
import Vuex from 'vuex';
import api from '../utils/api';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        pizzas: []
    },
    mutations: {
        SET_PIZZAS(state, payload) {
            state.pizzas = payload;
        }
    },
    actions: {
        async getPizzas({ commit }) {
            const pizzas = (await api.get('/pizza')).data;
            commit('SET_PIZZAS', pizzas);
        }
    },
    getters: {
        pizzas: ({ pizzas }) => pizzas
    }
});

export default store;
