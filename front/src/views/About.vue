<template>

    <div>
        <p>parent titre {{ titre }}</p>
    <AboutChild v-model ="titre" v-if="show" />

    <button @click="show= !show"> show/hide</button>

    </div>
    

</template>

<script setup>


import {ref, defineAsyncComponent } from 'vue'
const AboutChild = defineAsyncComponent(()=>import('./AboutChild.vue'))
const titre = ref("melek")
const show =ref( false)
</script>