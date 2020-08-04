<template>
    <v-app>
        <Header />
        <v-main>
            <v-container>
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { isEmpty } from './utils/composition';

export default {
    name: 'App',
    components: {
        Header: () => import('./components/Header.vue')
    },
    computed: {
        ...mapGetters(['cart']),
    },
    methods: {
        ...mapActions(['getCart'])
    },
    created() {
        isEmpty(this.cart) && this.getCart();
    }
};
</script>
