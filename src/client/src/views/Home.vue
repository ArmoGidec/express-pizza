<template>
    <v-row>
        <v-col v-for="pizza in pizzas" :key="pizza.id" cols="12" sm="6" md="4" lg="3">
            <Card :pizza="pizza" />
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { isEmpty } from '../utils/composition.js';

export default {
    name: 'Home',
    computed: {
        ...mapGetters(['pizzas'])
    },
    methods: {
        ...mapActions(['getPizzas'])
    },
    created() {
        isEmpty(this.pizzas) && this.getPizzas();
    },
    components: {
        Card: () => import('../components/Card.vue')
    }
};
</script>
