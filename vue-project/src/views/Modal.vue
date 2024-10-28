<template>
  <div id="modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <button class="back-button" @click="goBack">Back</button>
        <h3 class="ms-10">Invoice form</h3>

        <button class="close" @click="$emit('closeModal')">X</button>
      </div>
      <RouterView @closeModal="$emit('closeModal')" />
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
defineEmits(["closeModal"]);

const goBack = () => {
  //// to do
  router.go(-1);
};
</script>
<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background-color: #fefefe;
  margin: 3% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 1000px;
  border-radius: 5px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close {
  cursor: pointer;
  font-size: 16px;
  background-color: red;
}

.back-button {
  background-color: #45a049;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

button {
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #888;
}
</style>
