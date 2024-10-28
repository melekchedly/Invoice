<template>
  <form @submit.prevent="save">
    <div class="mb-3">
      <label for="formGroupExampleInput" class="form-label"
        >Seller companyname</label
      >
      <input type="text" v-model="seller.companyName" class="form-control" />
    </div>
    <div class="mb-3">
      <label for="formGroupExampleInput2" class="form-label"
        >Seller Address</label
      >
      <input type="text" class="form-control" v-model="seller.address" />
    </div>
    <div class="mb-3">
      <label for="formGroupExampleInput2" class="form-label">Serie</label>
      <input type="text" class="form-control" v-model="seller.serie" />
    </div>

    <button type="submit" class="btn btn-primary">Next</button>
  </form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const seller = ref({
  companyName: "",
  address: "",
  serie: "",
});

onMounted(() => {
  const savedseller = localStorage.getItem("seller");
  console.log(JSON.parse(savedseller));
  console.log(seller.value);

  if (savedseller) {
    seller.value.companyName = JSON.parse(savedseller).companyName;
    seller.value.address = JSON.parse(savedseller).address;
    seller.value.serie = JSON.parse(savedseller).serie;
  }
});
const save = () => {
  localStorage.setItem("seller", JSON.stringify(seller.value));
  router.push({ name: "product" });
};
</script>
