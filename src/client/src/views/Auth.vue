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
                                    <v-btn color="primary" type="submit">
                                        Login
                                    </v-btn>
                                </AuthForm>
                            </v-tab-item>
                            <v-tab-item key="register">
                                <AuthForm v-on:submit="register">
                                    <v-btn color="primary" type="submit">
                                        Register
                                    </v-btn>
                                </AuthForm>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </v-col>
            </v-row>
            <v-snackbar v-model="snackbar.show">
                {{ snackbar.text }}
                <template v-slot:action="{ attrs }">
                    <v-btn
                        v-bind="attrs"
                        text
                        color="error"
                        @click="snackbar.show = false"
                    >
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
            <v-overlay :value="processing">
                <v-progress-circular
                    indeterminate
                    color="primary"
                    size="100"
                ></v-progress-circular>
                <h4>Processing...</h4>
            </v-overlay>
        </v-container>
    </v-main>
</template>

<script>
import { mapGetters } from 'vuex';
import { isEmpty } from '../utils/composition';

export default {
    name: 'Auth',
    data: () => ({
        tab: null,
        snackbar: {
            show: false,
            text: ''
        },
        processing: false
    }),
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        async auth(action, defaultError, credentials) {
            this.processing = true;
            const result = await this.$store.dispatch(action, credentials);
            this.processing = false;
            if (!result.user) {
                this.snackbar.text =
                    result.message || result.error || defaultError;
                this.snackbar.show = true;
            } else {
                this.$router.push({ name: 'home' });
            }
        },
        login(credentials) {
            this.auth('login', 'Login failed((', credentials);
        },
        register(credentials) {
            this.auth('register', 'Register failed((', credentials);
        }
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
