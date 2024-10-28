<template> 

    <form @submit.prevent="save">
    <div class="mb-3">
  <label for="formGroupExampleInput" class="form-label">Client fullname</label>
  <input type="text"  v-model="client.fullName" class="form-control"  >
</div>
<div class="mb-3">
  <label for="formGroupExampleInput2" class="form-label">Client Address</label>
  <input type="text" class="form-control"  v-model="client.address" >
</div>
<div class="mb-3">
  <label for="formGroupExampleInput2" class="form-label">Client Phone</label>
  <input type="text" class="form-control" v-model="client.phone" >
</div>
 
<button  type="submit" class="btn btn-primary"> Next</button>
</form>
</template>

<script setup>
 import { ref ,onMounted } from 'vue';
 import { useRouter } from 'vue-router';

const router = useRouter();


const client = ref({
  fullName: '',
  phone: '',
  address: ''
});

onMounted(()=>{
const savedClient =localStorage.getItem('client')
console.log(JSON.parse(savedClient))
console.log(client.value)

if(savedClient){
    client.value.fullName=(JSON.parse(savedClient)).fullName
    client.value.phone=(JSON.parse(savedClient)).phone
    client.value.address=(JSON.parse(savedClient)).address
}
})
const save=()=>{
    localStorage.setItem('client', JSON.stringify(client.value));
    router.push({ name: 'seller' })
}
</script>
