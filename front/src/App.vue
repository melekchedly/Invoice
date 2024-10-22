<script setup>
</script>

<template>
   
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/details/1">details number one</RouterLink>
        <RouterLink to ="/user">user</RouterLink>


      </nav>
 <h1>___________________________________</h1>

  <RouterView />
</template>

<style scoped>

nav{
  margin: 100 px;
  background-color: bisque;
}
</style>
