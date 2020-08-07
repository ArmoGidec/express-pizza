<template>
    <v-main>
        <Header />
        <v-container>
            <div v-if="cart.length === 0" class="text-center mt-16">
                Your cart is empty. Please go to the
                <router-link :to="{ name: 'home' }">Home page</router-link> and
                add some awesome pizzas into the <strong>Cart</strong>
            </div>
            <v-row v-else>
                <v-col cols="12" lg="6">
                    <Cart>
                        <template v-slot:actions>
                            <v-btn color="error" @click="clear"
                                >Clear cart</v-btn
                            >
                            <router-link
                                :to="{ name: 'home' }"
                                class="text-decoration-none ml-3"
                            >
                                <v-btn color="primary">Back to menu</v-btn>
                            </router-link>
                        </template>
                    </Cart>
                </v-col>
                <v-col cols="12" lg="6">
                    <v-card>
                        <v-card-title class="justify-center"
                            >Order list</v-card-title
                        >
                        <v-card-text>
                            <div
                                class="d-flex text-h6"
                                v-for="pizza in formatedCart"
                                :key="pizza.id"
                            >
                                {{ pizza.name }}
                                <v-spacer></v-spacer>
                                <strong
                                    >{{ pizza.count }} * ({{
                                        pizza.price.usd | toCurrency('usd')
                                    }}
                                    /
                                    {{
                                        pizza.price.eur | toCurrency('eur')
                                    }})</strong
                                >
                                <span class="mx-2">=</span>
                                <strong
                                    >{{
                                        (pizza.price.usd * pizza.count)
                                            | toCurrency('usd')
                                    }}
                                    /
                                    {{
                                        (pizza.price.eur * pizza.count)
                                            | toCurrency('eur')
                                    }}</strong
                                >
                            </div>
                            <v-divider class="my-3"></v-divider>
                            <div class="d-flex text-h6">
                                + Delivery cost
                                <v-spacer></v-spacer>
                                <strong>
                                    {{ delivery.usd | toCurrency('usd') }} /
                                    {{ delivery.eur | toCurrency('eur') }}
                                </strong>
                            </div>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-title>
                            Total price
                            <v-spacer></v-spacer>
                            {{ totalPrice.usd | toCurrency('usd') }} /
                            {{ totalPrice.eur | toCurrency('eur') }}
                        </v-card-title>
                    </v-card>
                </v-col>
                <v-col cols="12" lg="8">
                    <v-form v-model="form.valid" @submit.prevent="submitOrder">
                        <v-card>
                            <v-card-title>Delivery Form</v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="form.firstname"
                                            :rules="form.nameRules"
                                            label="First name *"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="form.lastname"
                                            :rules="form.nameRules"
                                            label="Last name *"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="form.phone"
                                            :rules="form.phoneRules"
                                            label="Phone number *"
                                            required
                                            type="tel"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="form.email"
                                            :rules="form.emailRules"
                                            type="email"
                                            label="Email"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            v-model="form.address"
                                            :rules="form.addressRules"
                                            label="Address *"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="success" type="submit"
                                    >To order</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-col>
            </v-row>

            <v-overlay :value="processing">
                <v-progress-circular
                    indeterminate
                    color="primary"
                    size="100"
                ></v-progress-circular>
                <h4>Processing...</h4>
            </v-overlay>

            <v-overlay :value="success">
                <v-sheet elevation="3" color="success" class="pa-5">
                    <h3>Your order is being cooked!</h3>
                    <div class="btn-wrapper mt-3 d-flex justify-center">
                        <v-btn @click="clear" color="secondary">Ok</v-btn>
                    </div>
                </v-sheet>
            </v-overlay>
        </v-container>
    </v-main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { isMobilePhone, isEmail } from 'validator';

import { formatCart } from '../utils/composition.js';
import api from '../utils/api.js';

export default {
    name: 'Order',
    data: () => ({
        delivery: {
            usd: 2,
            eur: 1.75
        },
        form: {
            valid: false,
            firstname: '',
            lastname: '',
            nameRules: [v => !!v.trim() || 'Name is required'],
            phone: '',
            phoneRules: [
                v => !!v.trim() || 'Phone is required',
                v => isMobilePhone(v) || 'Invalid phone number'
            ],
            email: '',
            emailRules: [v => !v.trim() || isEmail(v) || 'Invalid email'],
            address: '',
            addressRules: [v => !!v.trim() || 'Address is required']
        },
        processing: false,
        success: false,
    }),
    computed: {
        ...mapGetters(['cart', 'token']),
        formatedCart() {
            return formatCart(this.cart);
        },
        totalPrice() {
            const prices = this.formatedCart
                .map(group => ({ ...group.price, count: group.count }))
                .concat(this.delivery);
            return prices.reduce(
                (total, current) => {
                    return {
                        usd: total.usd + current.usd * (current.count || 1),
                        eur: total.eur + current.eur * (current.count || 1)
                    };
                },
                { usd: 0, eur: 0 }
            );
        }
    },
    methods: {
        ...mapActions(['clearCart']),
        clear() {
            this.clearCart();
            this.$router.push({ name: 'home' });
        },
        submitOrder() {
            this.processing = true;
            const { firstname, lastname, email, phone, address } = this.form;
            api.post('/order', {
                pizzas: this.cart.map(pizza => pizza.id),
                data: { firstname, lastname, email, phone, address }
            }, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
                .then(() => {
                    this.processing = false;
                    this.success = true;
                });
        }
    },
    components: {
        Header: () => import('../components/Header'),
        Cart: () => import('../components/Cart')
    }
};
</script>
