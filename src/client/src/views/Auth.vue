<template>
    <v-main>
        <Header />
        <v-container class="mt-16">
            <v-row>
                <v-col
                    cols="12"
                    sm="10"
                    offset-sm="1"
                    md="8"
                    offset-md="2"
                    lg="6"
                    offset-lg="3"
                >
                    <v-card>
                        <v-tabs v-model="tab" slider-size="3">
                            <v-tab key="login">Sign In</v-tab>
                            <v-tab key="register">Sign Up</v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="tab">
                            <v-tab-item key="login">
                                <AuthForm v-on:submit="login">
                                    <v-btn color="primary" type="submit">Login</v-btn>
                                </AuthForm>
                            </v-tab-item>
                            <v-tab-item key="register">
                                <AuthForm v-on:submit="register">
                                    <v-btn color="primary" type="submit">Register</v-btn>
                                </AuthForm>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { isEmpty } from '../utils/composition';

export default {
    name: 'Auth',
    data: () => ({
        tab: null
    }),
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        ...mapActions(['login', 'register'])
    },
    created() {
        !isEmpty(this.user) && this.$router.replace({ name: 'home' });
    },
    components: {
        Header: () => import('../components/Header.vue'),
        AuthForm: () => import('../components/AuthForm.vue')
    }
};
</script>
