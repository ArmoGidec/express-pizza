<template>
    <v-app>
        <v-main v-if="loading">
            <v-row class="justify-center my-16">
                <Header />
                <v-progress-circular
                    indeterminate
                    color="primary"
                    size="100"
                ></v-progress-circular>
            </v-row>
        </v-main>
        <router-view v-else></router-view>
    </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { isEmpty } from './utils/composition';

export default {
    name: 'App',
    data: () => ({
        loading: true
    }),
    computed: {
        ...mapGetters(['pizzas', 'cart', 'user', 'orders', 'isAuthenticated'])
    },
    methods: {
        ...mapActions(['getPizzas', 'getCart', 'getUser', 'getOrders'])
    },
    async created() {
        try {
            await Promise.all([
                isEmpty(this.user) && this.getUser(),
                isEmpty(this.pizzas) && this.getPizzas(),
                isEmpty(this.cart) && this.getCart(),
                isEmpty(this.orders) && this.isAuthenticated && this.getOrders()
            ]);
        } finally {
            this.loading = false;
        }
    },
    components: {
        Header: () => import('./components/Header.vue')
    }
};
</script>

<style>
html[lang] {
    overflow-y: auto;
}
</style>
