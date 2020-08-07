<template>
    <v-card v-if="formatedCart.length">
        <v-card-title class="justify-center">
            <slot name="title">Order list</slot>
        </v-card-title>
        <v-card-text>
            <div
                class="d-flex text-h6"
                v-for="pizza in formatedCart"
                :key="pizza.id"
            >
                {{ pizza.name }}
                <v-spacer></v-spacer>
                <strong
                    >{{ pizza.count }} * ({{
                        pizza.price.usd | toCurrency('usd')
                    }}
                    /
                    {{ pizza.price.eur | toCurrency('eur') }})</strong
                >
                <span class="mx-2">=</span>
                <strong
                    >{{ (pizza.price.usd * pizza.count) | toCurrency('usd') }}
                    /
                    {{
                        (pizza.price.eur * pizza.count) | toCurrency('eur')
                    }}</strong
                >
            </div>
            <v-divider class="my-3"></v-divider>
            <div class="d-flex text-h6">
                + Delivery cost
                <v-spacer></v-spacer>
                <strong>
                    {{ delivery.usd | toCurrency('usd') }} /
                    {{ delivery.eur | toCurrency('eur') }}
                </strong>
            </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title>
            Total price
            <v-spacer></v-spacer>
            {{ totalPrice.usd | toCurrency('usd') }} /
            {{ totalPrice.eur | toCurrency('eur') }}
        </v-card-title>
        <slot></slot>
    </v-card>
    <v-card v-else>
        <v-card-title class="justify-center">Order list is empty</v-card-title>
    </v-card>
</template>

<script>
import { formatCart } from '../utils/composition.js';

export default {
    name: 'OrderList',
    props: {
        pizzas: {
            type: Array,
            default: () => []
        }
    },
    data: () => ({
        delivery: {
            usd: 2,
            eur: 1.75
        },
    }),
    computed: {
        formatedCart() {
            return formatCart(this.pizzas);
        },
        totalPrice() {
            const prices = this.formatedCart
                .map(group => ({ ...group.price, count: group.count }))
                .concat(this.delivery);
            return prices.reduce(
                (total, current) => {
                    return {
                        usd: total.usd + current.usd * (current.count || 1),
                        eur: total.eur + current.eur * (current.count || 1)
                    };
                },
                { usd: 0, eur: 0 }
            );
        }
    }
}
</script>
