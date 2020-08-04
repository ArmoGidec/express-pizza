<template>
    <v-card>
        <v-card-title>Cart</v-card-title>
        <v-card-text>
            <v-list>
                <v-list-item v-for="pizza in cart" :key="pizza._id">
                    {{ pizza.name }} - {{ pizza.description }} -
                    {{ pizza.count }}
                </v-list-item>
            </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn color="error">Clear cart </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success">Pay order</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
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
    }
};
</script>
