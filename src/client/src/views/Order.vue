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
                    <OrderList :pizzas="cart" />
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
                                            label="Shipping address *"
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
                    <h3>Your pizza is almost ready!</h3>
                    <div class="btn-wrapper mt-3 d-flex justify-center">
                        <v-btn @click="clear" color="secondary">Ok</v-btn>
                    </div>
                </v-sheet>
            </v-overlay>

            <v-overlay :value="failed">
                <v-sheet elevation="3" color="error" class="pa-5">
                    <h3>
                        Order finished with fail! Please, contact with us via
                        email:
                        <a href="mailto:chudak_93@live.com">
                            chudak_93@live.com
                        </a>
                    </h3>
                    <div class="btn-wrapper mt-3 d-flex justify-center">
                        <v-btn @click="failed = false" color="secondary">
                            Close
                        </v-btn>
                    </div>
                </v-sheet>
            </v-overlay>
        </v-container>
    </v-main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { isMobilePhone, isEmail } from 'validator';

export default {
    name: 'Order',
    data: () => ({
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
        failed: false
    }),
    computed: {
        ...mapGetters(['cart', 'token'])
    },
    methods: {
        ...mapActions(['clearCart', 'addOrder']),
        clear() {
            this.clearCart();
            this.$router.push({ name: 'home' });
        },
        submitOrder() {
            this.processing = true;
            const { firstname, lastname, email, phone, address } = this.form;

            this.addOrder({
                pizzas: this.cart.map(pizza => pizza.id),
                data: { firstname, lastname, email, phone, address }
            })
                .then(() => {
                    this.success = true;
                })
                .catch(() => {
                    this.failed = true;
                })
                .finally(() => {
                    this.processing = false;
                });
        }
    },
    components: {
        Header: () => import('../components/Header.vue'),
        Cart: () => import('../components/Cart.vue'),
        OrderList: () => import('../components/OrderList.vue')
    }
};
</script>
