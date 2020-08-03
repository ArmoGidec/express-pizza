<template>
    <v-app-bar app color="primary" dark>
        <v-container>
            <v-toolbar-title>
                <router-link :to="{ name: 'home' }">
                    <v-btn text>Express-Pizza</v-btn>
                </router-link>
            </v-toolbar-title>
        </v-container>
    </v-app-bar>
</template>

<script>
export default {
    name: 'Header'
};
</script>
