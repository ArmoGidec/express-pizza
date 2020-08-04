<template>
    <v-app-bar app color="primary" dark>
        <v-container>
            <v-row>
                <v-toolbar-title>
                    <router-link :to="{ name: 'home' }">
                        <v-btn text>Express-Pizza</v-btn>
                    </router-link>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-badge color="green" :content="cart.length" :value="cart.length" bordered overlap>
                    <v-btn fab small color="teal">
                        <v-icon>mdi-cart</v-icon>
                    </v-btn>
                </v-badge>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Header',
    computed: {
        ...mapGetters(['cart'])
    }
};
</script>
