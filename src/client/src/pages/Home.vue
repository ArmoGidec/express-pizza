<template>
    <v-row>
        <v-col v-for="pizza in pizzas" :key="pizza.id" cols="12" md="6" lg="4">
            <Card :pizza="pizza" />
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { isEmpty } from '$src/utils/composition.js';

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
        Card: () => import('$src/components/Card.vue')
    }
};
</script>
