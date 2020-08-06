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
        ...mapGetters(['cart', 'user'])
    },
    methods: {
        ...mapActions(['getCart', 'getUser'])
    },
    created() {
        isEmpty(this.cart) && this.getCart();
        isEmpty(this.user) && this.getUser();
    }
};
</script>

<style>
html[lang] {
    overflow-y: auto;
}
</style>
