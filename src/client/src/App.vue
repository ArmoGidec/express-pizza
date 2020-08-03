<template>
    <v-app>
        <Header />
        <v-main>
            <v-container>
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    components: {
        Header: () => import('$src/components/Header.vue')
    }
};
</script>
