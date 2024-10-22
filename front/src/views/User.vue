<template>
    <h1>tt{{ x }}</h1>
    <h1>tt{{ y }}</h1>

    <table>
        <thead>
        <th> name</th>
        <th> email</th>
    </thead>
    
    <tr v-for="user in users" :key="user.id">
        <td >{{ user.email }}</td>
        <td >{{ user.name }}</td>

    </tr>

</table>
<button @click="showformulaire =true">add new user </button>

<UserForm v-if="showformulaire" @hide="hide"/>
</template>

<script setup>
import axios from 'axios';
import UserForm from './UserForm.vue';
import {ref , onMounted} from 'vue'
import { useMouse } from './mouse';
const {x ,y}=useMouse()
const users = ref([]) 
const showformulaire =ref( false)
const getUsers =async ()=>{
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    users.value=response.data
}

const hide=(input)=>{
    showformulaire.value=false
    console.log(input)
}
onMounted(getUsers)
</script>