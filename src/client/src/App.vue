<template>
    <v-app>
        <router-view></router-view>
    </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { isEmpty } from './utils/composition';

export default {
    name: 'App',
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
