<template>
    <v-card max class="card">
        <v-img :src="pizza.photoUrl" />
        <v-card-title>{{ pizza.name }}</v-card-title>
        <v-card-text>
            {{ pizza.description }}
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-title class="py-0">
            {{ pizza.price.usd | toCurrency }}
            <template v-if="count > 1">
                * {{ count }} = {{ pizza.price.usd * count | toCurrency }}
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
            <v-btn>Add to Cart</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
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
        count: 1
    }),
    components: {
        Counter: () => import('./Counter.vue')
    },
    methods: {
        change(val) {
            this.count = this.count + val || 1;
        }
    }
};
</script>

<style lang="scss" scoped>
.card {
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
