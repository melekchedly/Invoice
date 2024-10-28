<template>
  <button class="right btn btn-success" @click="toPdf">PDF</button>
  <div id="toPdf" class="container">
    <h4 class="mb-3">Invoice details #{{ $route.params.id }}</h4>

    <div class="row">
      <div class="col-md-3">
        <h5>client details</h5>

        <div class="mb-1">
          <label for="formGroupExampleInput" class="form-label">fullName</label>
          <input
            type="text"
            v-model="invoice.client.fullName"
            class="form-control"
          />
        </div>
        <div class="mb-1">
          <label for="formGroupExampleInput2" class="form-label">Address</label>
          <input
            type="text"
            class="form-control"
            v-model="invoice.client.address"
          />
        </div>
        <div class="mb-1">
          <label for="formGroupExampleInput2" class="form-label">Phone</label>
          <input
            type="text"
            class="form-control"
            v-model="invoice.client.phone"
          />
        </div>
      </div>

      <div class="col-md-4">
        <h5>seller details</h5>

        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label"
            >companyName</label
          >
          <input
            type="text"
            v-model="invoice.seller.companyName"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">Address</label>
          <input
            type="text"
            class="form-control"
            v-model="invoice.seller.address"
          />
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">Serie</label>
          <input
            type="text"
            class="form-control"
            v-model="invoice.seller.serie"
          />
        </div>
      </div>
      <div class="col-md-5">
        <h5>product details</h5>
        <div class="row" v-for="product in invoice.products" :key="product._id">
          <div class="col">
            <label for="formGroupExampleInput" class="form-label">title</label>
            <input type="text" v-model="product.title" class="form-control" />
          </div>
          <div class="col">
            <label for="formGroupExampleInput2" class="form-label">price</label>
            <input type="number" class="form-control" v-model="product.price" />
          </div>
          <div class="col">
            <label for="formGroupExampleInput2" class="form-label"
              >quantity</label
            >
            <input
              type="number"
              class="form-control"
              v-model="product.quantity"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <button type="button" class="btn btn-primary right" @click="updateInvoice">
    Update
  </button>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getById, update } from "@/axios/invoice";
import html2pdf from "html2pdf.js";
const invoice = ref({
  client: { fullName: "", address: "", phone: "" },
  seller: { companyName: "", addess: "", serie: "" },
  products: [{ title: "", price: "", quantity: "" }],
});

onMounted(() => fetchInvoice());

const fetchInvoice = async () => {
  try {
    invoice.value = await getById(useRoute().params.id);
    console.log("invoice");

    console.log(invoice.value);
  } catch (error) {
    console.error("Error fetching invoices:", error);
  }
};
const toPdf = () => {
  html2pdf(document.getElementById("toPdf"), {
    margin: 1,
    filename: "invoicePdf",
  });
};

const updateInvoice = async () => {
  await update(invoice.value);
};
</script>
<style scoped>
.right {
  float: right;
  width: auto;
  margin-right: 30px;
}

h4 {
  color: blue;
}
</style>
