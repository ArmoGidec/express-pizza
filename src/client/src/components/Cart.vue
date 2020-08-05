<template>
    <v-card>
        <v-card-title>Cart</v-card-title>
        <v-card-text>
            <v-list>
                <v-list-item v-for="pizza in cart" :key="pizza._id">
                    <span class="mr-2">{{ pizza.name }}</span>
                    <strong> {{ pizza.price.usd | toCurrency }}</strong>
                    <v-spacer></v-spacer>
                    <Counter
                        :count="pizza.count"
                        v-on:add="addToCart({ ...pizza, count: 1 })"
                        v-on:subtract="removeFromCart({ ...pizza, count: 1 })"
                    />
                    <v-btn fab small text class="ml-4" title="Remove from cart" @click="removeFromCart(pizza)"
                        ><v-icon>mdi-close</v-icon></v-btn
                    >
                </v-list-item>
            </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <slot name="actions"></slot>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import groupby from 'lodash.groupby';

export default {
    name: 'Cart',
    computed: {
        cart() {
            const cart = this.$store.getters.cart;
            const cartGroups = groupby(cart, '_id');
            return Object.entries(cartGroups).map(([_id, group]) => ({
                _id,
                ...group[0],
                count: group.length
            }));
        }
    },
    methods: {
        ...mapActions(['removeFromCart', 'addToCart']),
    },
    components: {
        Counter: () => import('./Counter.vue')
    }
};
</script>
