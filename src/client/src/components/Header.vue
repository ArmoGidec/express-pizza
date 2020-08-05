<template>
    <v-app-bar app color="primary" dark height="70">
        <v-container>
            <v-row>
                <v-toolbar-title>
                    <router-link :to="{ name: 'home' }">
                        <v-btn text>Express-Pizza</v-btn>
                    </router-link>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog max-width="560" v-model="openCart">
                    <template v-slot:activator="{ on, attrs }">
                        <v-badge
                            color="green"
                            :content="cart.length"
                            :value="cart.length"
                            bordered
                            overlap
                        >
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
                        </v-badge>
                    </template>
                    <Cart>
                        <template v-slot:actions>
                            <v-btn color="error" @click="clear"
                                >Clear cart</v-btn
                            >
                            <v-spacer></v-spacer>
                            <v-btn color="success">Pay order</v-btn>
                        </template>
                    </Cart>
                </v-dialog>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Header',
    data: () => ({
        openCart: false
    }),
    computed: {
        ...mapGetters(['cart'])
    },
    methods: {
        ...mapActions(['clearCart']),
        clear() {
            this.clearCart();
            this.openCart = false;
        }
    },
    components: {
        Cart: () => import('./Cart.vue')
    }
};
</script>
