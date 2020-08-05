<template>
    <v-app-bar app color="primary" dark height="70">
        <v-container>
            <v-row class="align-center">
                <v-toolbar-title>
                    <router-link :to="{ name: 'home' }">
                        <v-btn text>Express-Pizza</v-btn>
                    </router-link>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <slot></slot>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
export default {
    name: 'Header',
};
</script>
