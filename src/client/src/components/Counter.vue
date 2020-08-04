<template>
    <div class="counter">
        <v-btn id="counter__btn--subtract" @click="$emit('subtract')">
            <v-icon>mdi-minus</v-icon>
        </v-btn>
        <span class="counter__display">
            {{ count }}
        </span>
        <v-btn id="counter__btn--add" @click="$emit('add')">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    props: {
        count: {
            type: Number,
            default: 0
        }
    }
};
</script>

<style lang="scss" scoped>
.counter {
    display: flex;
    height: 100%;

    #counter__btn {
        &--add,
        &--subtract {
            padding: 0;
            height: unset;
            min-width: unset;
        }
    }

    &__display {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background-color: rgb(253, 222, 175);
        flex: 1;
        width: 50px;
    }
}
</style>
