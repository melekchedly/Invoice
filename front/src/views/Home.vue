<template>
<div>
    <p>this the home page u are very welcome </p>
    <h1>hello {{user.name}}</h1>
    <h1>hello {{user.lastName}}</h1>

    <h1>hello {{user.age}}</h1>

    <Formulaire @user-Data="recivedata" />
</div>
</template>
<script setup>
 import Formulaire from './Formulaire.vue'
 import {ref} from 'vue'
const user = ref({
    name:'',
    lastName:'',
    age:0
})
 const recivedata =(userDara)=>{
user.value=userDara                                                                     
console.log("recivedd from parent ");
 }
</script>

<style scoped>
p {
    height: 100 px;
    width: 100 px;
    background-color: blueviolet;
    display: block;
    margin: 50;
}
</style>