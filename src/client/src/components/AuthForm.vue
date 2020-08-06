<template>
    <v-form class="px-6" @submit.prevent="$emit('submit', { email, password })">
        <v-row>
            <v-col>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email *"
                    type="email"
                    required
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password *"
                    type="password"
                    required
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div class="btn-wrapper d-flex justify-end">
                    <slot v-bind="{ email, password }"></slot>
                </div>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
import { isEmail } from 'validator';

export default {
    name: 'AuthForm',
    data: () => ({
        email: '',
        emailRules: [
            v => !!v.trim() || 'Email is required',
            v => isEmail(v) || 'Invalid email'
        ],
        password: '',
        passwordRules: [
            v => !!v.trim() || 'Email is required',
            v => v.length >= 6 || 'Password length must be at least 6 characters'
        ]
    })
};
</script>
