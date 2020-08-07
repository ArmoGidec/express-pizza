<template>
    <v-main>
        <Header>
            <v-btn-toggle
                v-model="currency"
                class="mr-3"
                rounded
                title="Toggle currency"
            >
                <v-btn :value="'usd'">
                    <v-icon>mdi-currency-usd</v-icon>
                </v-btn>
                <v-btn :value="'eur'">
                    <v-icon>mdi-currency-eur</v-icon>
                </v-btn>
            </v-btn-toggle>
            <v-dialog max-width="560" v-model="openCart">
                <template v-slot:activator="{ on, attrs }">
                    <v-badge
                        color="green"
                        :content="cart.length"
                        :value="cart.length"
                        bordered
                        overlap
                    >
                        <div class="btn-wrapper">
                            <v-btn
                                fab
                                small
                                color="teal"
                                v-on="cart.length > 0 && on"
                                v-bind="attrs"
                                :title="
                                    cart.length > 0
                                        ? 'Open cart'
                                        : 'Cart is empty'
                                "
                            >
                                <v-icon>mdi-cart-outline</v-icon>
                            </v-btn>
                        </div>
                    </v-badge>
                </template>
                <Cart>
                    <template v-slot:actions>
                        <v-btn color="error" @click="clear">Clear cart</v-btn>
                        <v-spacer></v-spacer>
                        <router-link
                            :to="{ name: 'order' }"
                            class="text-decoration-none"
                        >
                            <v-btn color="success">Fill order</v-btn>
                        </router-link>
                    </template>
                </Cart>
            </v-dialog>
        </Header>
        <v-container>
            <v-row>
                <v-col
                    v-for="pizza in pizzas"
                    :key="pizza.id"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                >
                    <Card :pizza="pizza" />
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Home',
    data: () => ({
        openCart: false
    }),
    computed: {
        ...mapGetters(['pizzas', 'cart']),
        currency: {
            get() {
                return this.$store.getters.currency;
            },
            set() {
                this.toggleCurrency();
            }
        }
    },
    methods: {
        ...mapActions(['clearCart', 'toggleCurrency']),
        clear() {
            this.clearCart();
            this.openCart = false;
        }
    },
    components: {
        Header: () => import('../components/Header.vue'),
        Card: () => import('../components/Card.vue'),
        Cart: () => import('../components/Cart.vue')
    }
};
</script>
