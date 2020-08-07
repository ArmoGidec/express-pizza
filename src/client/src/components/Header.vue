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
                    <router-link :to="{ name: 'auth' }">
                        <v-btn outlined class="mx-3">
                            Sign In/Up <v-icon class="ml-1">mdi-login</v-icon>
                        </v-btn>
                    </router-link>
                </template>
                <template v-else>
                    <v-btn outlined @click="logout" class="mx-3">
                        Log Out
                        <v-icon class="ml-1">mdi-logout</v-icon>
                    </v-btn>
                    <router-link :to="{ name: 'orders' }" class="text-decoration-none">
                        <v-btn outlined>
                            My orders
                            <v-icon class="ml-1">mdi-playlist-check</v-icon>
                        </v-btn>
                    </router-link>
                </template>
                <v-spacer></v-spacer>
                <slot></slot>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'Header',
    computed: {
        ...mapGetters(['isAuthenticated'])
    },
    methods: {
        ...mapActions(['logout'])
    }
};
</script>
