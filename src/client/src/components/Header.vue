<template>
    <v-app-bar app color="primary" dark height="70">
        <v-container>
            <v-row class="align-center">
                <v-toolbar-title>
                    <router-link :to="{ name: 'home' }">
                        <v-btn text>Express-Pizza</v-btn>
                    </router-link>
                </v-toolbar-title>
                <template v-if="!isAuthenticated">
                    <router-link :to="{name:'auth'}">
                        <v-btn outlined class="ml-3">Sign In/Up</v-btn>
                    </router-link>
                </template>
                <v-spacer></v-spacer>
                <slot></slot>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Header',
    computed: {
        ...mapGetters(['isAuthenticated'])
    }
};
</script>
