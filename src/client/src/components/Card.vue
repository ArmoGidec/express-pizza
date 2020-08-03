<template>
    <v-card>
        <v-img :src="pizza.photo_url">
            <v-card-title>{{ pizza.name }}</v-card-title>
        </v-img>
        <v-card-text>
            {{ pizza.description }}
        </v-card-text>
    </v-card>
</template>

<script>
const defaultPizza = {
    name: '',
    description: '',
    photoUrl: '',
    price: {
        usd: 0,
        eur: 0
    }
};

export default {
    props: {
        pizza: {
            type: Object,
            default: () => defaultPizza
        }
    }
};
</script>
