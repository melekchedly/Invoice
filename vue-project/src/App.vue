<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Invoices from './views/Invoices.vue'




</script>

<template>
  

      <nav>
        <RouterLink to="/invoices">Home</RouterLink>
       
      </nav> 
     
  
     <RouterView /> 
</template>


