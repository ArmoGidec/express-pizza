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
                            >
                                <v-icon>mdi-cart-outline</v-icon>
                            </v-btn>
                        </v-badge>
                    </template>
                    <Cart v-on:clear="openCart = false"/>
                </v-dialog>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Header',
    data: () => ({
        openCart: false
    }),
    computed: {
        ...mapGetters(['cart'])
    },
    components: {
        Cart: () => import('./Cart.vue')
    }
};
</script>
