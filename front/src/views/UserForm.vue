<template>
<form @submit.prevent="addUser">
<label>name</label><input type="text" v-model="user.name" >
<label>username</label><input type="text" v-model="user.username">
<label>email</label><input type="text" v-model="user.email">  
<button type="submit" @click="hideform">save</button>
</form>  
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const user = ref({name:"",username:"",email:""})


const addUser =async()=>{
    const response = await axios.post('https://jsonplaceholder.typicode.com/users',user.value)
    console.log(user.value)
}
const emit = defineEmits(['hide'])
const hideform =()=>{
    emit('hide',false)
}
</script>