<template>
    <v-app-bar app color="primary" dark extension-height="70" extended>
        <v-toolbar-title class="mx-auto">
            <router-link :to="{ name: 'home' }" class="text-decoration-none">
                <v-btn text>Express-Pizza</v-btn>
            </router-link>
        </v-toolbar-title>
        <template v-slot:extension>
            <v-container>
                <div class="d-flex align-center">
                    <template v-if="!isAuthenticated">
                        <router-link :to="{ name: 'auth' }">
                            <v-btn outlined class="mx-3">
                                Sign In/Up
                                <v-icon class="ml-1">mdi-login</v-icon>
                            </v-btn>
                        </router-link>
                    </template>
                    <template v-else>
                        <v-btn outlined @click="logout" class="mx-3">
                            Log Out
                            <v-icon class="ml-1">mdi-logout</v-icon>
                        </v-btn>
                        <router-link
                            :to="{ name: 'orders' }"
                            class="text-decoration-none"
                        >
                            <v-btn outlined>
                                My orders
                                <v-icon class="ml-1">mdi-playlist-check</v-icon>
                            </v-btn>
                        </router-link>
                    </template>
                    <v-spacer></v-spacer>
                    <slot></slot>
                </div>
            </v-container>
        </template>
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
