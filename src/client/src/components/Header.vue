<template>
    <v-app-bar app color="primary" dark>
        <v-container class="py-0">
            <v-row align="center">
                <v-toolbar-title>
                    <router-link
                        :to="{ name: 'home' }"
                        class="text-decoration-none"
                    >
                        <v-btn text>Express-Pizza</v-btn>
                    </router-link>
                </v-toolbar-title>
                <template v-if="$vuetify.breakpoint.name === 'xs'">
                    <v-spacer></v-spacer>
                    <v-app-bar-nav-icon
                        @click="display = !display"
                    ></v-app-bar-nav-icon>
                </template>
                <div
                    class="flex-wrap align-center text-center flex-grow-1"
                    :class="{ 'd-none': !display, 'd-flex': display }"
                >
                    <template v-if="!isAuthenticated">
                        <router-link :to="{ name: 'auth' }" class="d-block">
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
                            class="text-decoration-none d-block"
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
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'Header',
    data() {
        return {
            display: this.$vuetify.breakpoint.name !== 'xs'
        };
    },
    computed: {
        ...mapGetters(['isAuthenticated'])
    },
    methods: {
        ...mapActions(['logout'])
    }
};
</script>

<style lang="scss">
.v-main {
    padding-top: 0 !important;
}

.v-toolbar {
    position: sticky !important;

    &,
    &__content {
        height: unset !important;
    }
}
</style>
