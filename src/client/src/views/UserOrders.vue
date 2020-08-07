<template>
    <v-main>
        <Header />
        <v-container>
            <v-row v-if="orders.length > 0">
                <v-col cols="12" lg="6" v-for="order in orders" :key="order.id">
                    <OrderList :pizzas="order.pizzas" class="order">
                        <template v-slot:title>
                            Order list of {{ order.date | toLocaleDateString }}
                        </template>
                        <v-spacer></v-spacer>
                        <v-divider></v-divider>
                        <v-card-title class="justify-center">
                            Order data
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <h3>
                                        Fullname: {{ order.data.firstname }}
                                        {{ order.data.lastname }}
                                    </h3>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <h3>
                                        Contacts: {{ order.data.phone }}
                                        {{
                                            order.data.email
                                                ? `(${order.data.email})`
                                                : ''
                                        }}
                                    </h3>
                                </v-col>
                                <v-col cols="12">
                                    <h3>Address: {{ order.data.address }}</h3>
                                </v-col>
                                <v-col
                                    cols="12"
                                    class="d-flex justify-space-between"
                                >
                                    <h3>
                                        Status:
                                        <span
                                            :class="
                                                `${
                                                    order.delivered
                                                        ? 'green'
                                                        : 'black'
                                                }--text`
                                            "
                                        >
                                            {{
                                                order.delivered
                                                    ? 'Delivered'
                                                    : 'Not Delivered'
                                            }}
                                        </span>
                                    </h3>
                                    <v-btn
                                        v-if="!order.delivered"
                                        outlined
                                        color="success"
                                        @click="mark(order.id)"
                                        :loading="loading[order.id]"
                                    >
                                        Mark as delivered
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                                <v-col>
                                    <div class="btn-wrapper d-flex justify-end">
                                        <v-btn color="primary" @click="repeatOrder(order)">
                                            Repeat the order
                                        </v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-overlay :value="processing">
                            <v-progress-circular
                                indeterminate
                                color="primary"
                                size="100"
                            ></v-progress-circular>
                            <h4>Processing...</h4>
                        </v-overlay>
                    </OrderList>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col>
                    You haven't ordered anything yet. Please go to the
                    <router-link :to="{ name: 'home' }">Home page</router-link>
                    and add some awesome pizzas into the <strong>Cart</strong>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { formatCart } from '../utils/composition';

export default {
    name: 'UserOrders',
    data: () => ({
        processing: false,
        loading: {}
    }),
    computed: {
        ...mapGetters(['isAuthenticated', 'orders', 'pizzas']),
    },
    methods: {
        ...mapActions(['clearCart', 'addToCart', 'markDelivered']),
        repeatOrder(order) {
            const formatedCart = formatCart(order.pizzas);
            this.clearCart();
            for (const cartItem of formatedCart) {
                this.addToCart(cartItem);
            }
            this.$router.push({ name: 'order' });
        },
        mark(orderId) {
            this.loading = { ...this.loading, [orderId]: true };
            this.markDelivered(orderId).finally(() => {
                this.loading = { ...this.loading, [orderId]: false };
            });
        }
    },
    created() {
        !this.isAuthenticated && this.$router.replace({ name: 'auth' });

        this.$store.subscribeAction({
            before: (action) => {
                if (action.type === 'logout') {
                    this.processing = true;
                }
            },
            after: (action) => {
                if (action.type === 'logout') {
                    this.processing = false;
                    this.$route.name !== 'auth' && this.$router.replace({ name: 'auth' });
                }
            }
        })
    },
    components: {
        Header: () => import('../components/Header.vue'),
        OrderList: () => import('../components/OrderList.vue')
    }
};
</script>

<style lang="scss" scoped>
.order {
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
