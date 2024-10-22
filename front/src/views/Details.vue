<template>
    <div>
        <h1>details</h1>
       <p>{{id }}</p> 

    </div>
</template>
<script setup>
import { useRoute } from "vue-router"

const route = useRoute();
const id = route.params.id
</script>