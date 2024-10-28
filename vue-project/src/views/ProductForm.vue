<template>
  <form @submit.prevent="save">
    <div class="row" v-for="(product, index) in products" :key="index">
      <div class="col">
        <label for="formGroupExampleInput" class="form-label"
          >Product title</label
        >
        <input type="text" v-model="product.title" class="form-control" />
      </div>
      <div class="col">
        <label for="formGroupExampleInput2" class="form-label">price</label>
        <input type="number" class="form-control" v-model="product.price" />
      </div>
      <div class="col">
        <label for="formGroupExampleInput2" class="form-label">quantity</label>
        <input type="number" class="form-control" v-model="product.quantity" />
      </div>
      <div class="col">
        <button type="button" @click="remove(index)" class="btn btn-danger m-3">
          del
        </button>
        <button type="button" @click="add" class="btn btn-primary m-3">
          add
        </button>
      </div>
    </div>

    <button type="submit" class="btn btn-primary">Save</button>
  </form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { createInvoice } from "@/axios/invoice";

const router = useRouter();

const products = ref([
  {
    title: "",
    price: null,
    quantity: null,
  },
]);

const emit = defineEmits(["closeModal"]);

onMounted(() => {
  const savedproduct = localStorage.getItem("products");
  console.log(JSON.parse(savedproduct));

  if (savedproduct) {
    products.value = [];
    JSON.parse(savedproduct).map((product, index) => {
      const p = {};
      p.title = product.title;
      p.price = product.price;
      p.quantity = product.quantity;
      products.value.push(p);
    });
    console.log("p");

    console.log(products.value);
  }
});
const save = async () => {
  localStorage.setItem("products", JSON.stringify(products.value));
  await createInvoice();
  emit("closeModal");
  // router.push({ name: 'invoices' })
};

const add = () => {
  products.value.push({ title: "", price: null, quantity: null });
};

const remove = (indexx) => {
  products.value = products.value.filter((product, index) => index !== indexx);
  console.log(
    products.value.filter((product, index) => {
      index !== indexx;
      console.log(indexx);
    })
  );
};
</script>
