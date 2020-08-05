<template>
    <v-main>
        <Header />
        <v-container>
            <div v-if="cart.length === 0" class="text-center mt-16">
                Your cart is empty. Please go to the
                <router-link :to="{ name: 'home' }">Home page</router-link> and
                add some awesome pizzas into the <strong>Cart</strong>
            </div>
            <v-row v-else>
                <v-col cols="12" lg="6">
                    <Cart>
                        <template v-slot:actions>
                            <v-btn color="error" @click="clear"
                                >Clear cart</v-btn
                            >
                            <router-link
                                :to="{ name: 'home' }"
                                class="text-decoration-none ml-3"
                            >
                                <v-btn color="primary">Back to menu</v-btn>
                            </router-link>
                        </template>
                    </Cart>
                </v-col>
                <v-col cols="12" lg="6">
                    <v-card>
                        <v-card-title>Total price</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <div
                                class="d-flex text-h6"
                                v-for="pizza in formatCart"
                                :key="pizza._id"
                            >
                                {{ pizza.name }}
                                <v-spacer></v-spacer>
                                <strong
                                    >{{ pizza.count }} * ({{
                                        pizza.price.usd | toCurrency('usd')
                                    }}
                                    /
                                    {{
                                        pizza.price.eur | toCurrency('eur')
                                    }})</strong
                                >
                                <span class="mx-2">=</span>
                                <strong
                                    >{{
                                        (pizza.price.usd * pizza.count)
                                            | toCurrency('usd')
                                    }}
                                    /
                                    {{
                                        (pizza.price.eur * pizza.count)
                                            | toCurrency('eur')
                                    }}</strong
                                >
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { formatCart } from '../utils/composition.js';
export default {
    name: 'Order',
    computed: {
        ...mapGetters(['cart']),
        formatCart() {
            return formatCart(this.cart);
        }
    },
    methods: {
        ...mapActions(['clearCart']),
        clear() {
            this.clearCart();
            this.$router.push({ name: 'home' });
        }
    },
    components: {
        Header: () => import('../components/Header'),
        Cart: () => import('../components/Cart')
    }
};
</script>
