import api from '../utils/api.js';

const state = {
    orders: []
};

/**
 * @type { import('vuex'.MutationTree<state>) }
 */
const mutations = {
    SET_ORDERS(state, payload) {
        state.orders = payload;
    },
    MARK_DELIVERED(state, orderId) {
        const index = state.orders.findIndex(order => order.id === orderId)
        if (index > -1) {
            state.orders[index].delivered = true;
        }
    }
};

/**
 * @type { import('vuex').ActionTree<state> }
 */
const actions = {
    async getOrders({ commit, getters }) {
        const orders = (
            await api
                .get('/order', {
                    headers: {
                        Authorization: `Bearer ${getters.token}`
                    }
                })
                .catch(() => ({ data: [] }))
        ).data;
        commit('SET_ORDERS', orders);
    },
    async addOrder({ commit, getters }, orderData) {
        const order = (
            await api.post('/order', orderData, {
                headers: {
                    Authorization: `Bearer ${getters.token}`
                }
            })
        ).data;
        
        commit('SET_ORDERS', getters.orders.concat(order));
    },
    async markDelivered({ commit, getters }, orderId) {
        const data = (await api.post(`/order/${orderId}/mark`, null, {
            headers: {
                Authorization: `Bearer ${getters.token}`
            }
        }));

        commit('MARK_DELIVERED', orderId);
        return data;
    }
};

/**
 * @type { import('vuex').GetterTree<state> }
 */
const getters = {
    orders: ({ orders }) => orders
};

export default { state, mutations, actions, getters };
