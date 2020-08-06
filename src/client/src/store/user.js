import api from '../utils/api.js';
import { isEmpty } from '../utils/composition.js';

const state = {
    token: '',
    user: null
};

/**
 * @type {import('vuex').MutationTree<state>}
 */
const mutations = {
    SET_USER(state, payload) {
        state.user = payload;
    }
};

/**
 * @type {import('vuex').ActionTree<state>}
 */
const actions = {
    getUser({ state }) {
        return (
            !isEmpty(state.token) &&
            api.get('/user/me', {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            })
        );
    },
    login(_, credentials) {
        console.log(credentials);
    },
    register(_, credentials) {
        console.log(credentials);
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
