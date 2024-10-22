<template>
<div>
    <h1>this is the formmulaire</h1>
    <form @submit.prevent="sendtoparent">
    <input type="text" v-model="user.name" placeholder="enter your name ">
        <input type="text" v-model="user.lastName" placeholder="enter lastname ">

    <input type="number" v-model="user.age" placeholder="enter your age ">

    <button type="submit">save</button>
    </form>
    <p>your name is {{user.name}}</p>
    </div>
</template>

<script setup>
import {ref,defineEmits} from 'vue'
const user = ref({
    name:'',
    lastName:'',
    age:0
})
 const emit = defineEmits(['userData'])
const sendtoparent =()=>{
   emit('userData',user.value)
   console.log(user );
    console.log("emit from child " );
}
</script>