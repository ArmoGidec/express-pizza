import api from '../utils/api.js';
import { isEmpty } from '../utils/composition.js';

const state = {
    token: localStorage.getItem('token') || '',
    user: null
};

/**
 * @type {import('vuex').MutationTree<state>}
 */
const mutations = {
    SET_USER(state, payload) {
        state.user = payload;
    },
    SET_TOKEN(state, payload) {
        state.token = payload;
        if (!isEmpty(payload)) {
            localStorage.setItem('token', payload);
        } else {
            localStorage.removeItem('token');
        }
    }
};

/**
 * @type {import('vuex').ActionTree<state>}
 */
const actions = {
    getUser({ state, commit }) {
        return (
            (!isEmpty(state.token) &&
            api
                .get('/user/me', {
                    headers: {
                        Authorization: `Bearer ${state.token}`
                    }
                })
                .then(({ data }) => commit('SET_USER', data.user)))
        );
    },
    async auth({ commit }, { path, credentials }) {
        try {
            const { token, user } = (await api.post(path, credentials)).data;
            commit('SET_USER', user);
            commit('SET_TOKEN', token);

            return { token, user };
        } catch (error) {
            return error.response.data || error;
        }
    },
    login({ dispatch }, credentials) {
        return dispatch('auth', { path: '/user/login', credentials });
    },
    async register({ dispatch }, credentials) {
        return dispatch('auth', { path: '/user', credentials });
    },
    logout({ commit }) {
        commit('SET_USER', null);
        commit('SET_TOKEN', '');
        return api.get('/user/logout', {
            headers: {
                Authorization: `Bearer ${state.token}`
            }
        });
    }
};

/**
 * @type {import('vuex').GetterTree<state>}
 */
const getters = {
    user: ({ user }) => user,
    isAuthenticated: ({ user }) => !isEmpty(user)
};

export default { state, mutations, actions, getters };
