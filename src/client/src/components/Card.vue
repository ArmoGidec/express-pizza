<template>
    <v-card max class="card">
        <v-img :src="pizza.photoUrl" class="blue-grey darken-2" />
        <v-card-title>{{ pizza.name }}</v-card-title>
        <v-card-text>
            {{ pizza.description }}
        </v-card-text>
        <v-card-title class="py-0">
            {{ pizza.price[currency] | toCurrency(currency) }}
            <template v-if="count > 1">
                * {{ count }} = {{ pizza.price[currency] * count | toCurrency(currency) }}
            </template>
        </v-card-title>
        <v-card-actions>
            <Counter
                :count="count"
                class="rounded elevation-2"
                v-on:add="change(1)"
                v-on:subtract="change(-1)"
            />
            <v-spacer></v-spacer>
            <v-btn @click="add">Add to Cart</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
const defaultPizza = {
    name: '',
    description: '',
    photoUrl: '',
    price: {
        usd: 0,
        eur: 0
    }
};

export default {
    props: {
        pizza: {
            type: Object,
            default: () => defaultPizza
        }
    },
    data: () => ({
        count: 1,
    }),
    computed: {
        ...mapGetters(['currency'])
    },
    methods: {
        ...mapActions(['addToCart']),
        change(val) {
            this.count = this.count + val || 1;
        },
        async add() {
            this.addToCart({ ...this.pizza, count: this.count });
            this.count = 1;
        }
    },
    components: {
        Counter: () => import('./Counter.vue')
    },
};
</script>

<style lang="scss" scoped>
.card {
    height: 100%;
    display: flex;
    flex-direction: column;

    &__img {
        flex: 1;
    }
}
</style>
