<template>
<Modal v-if="openModal" @closeModal="openModal=false" />  
<button class="right btn btn-success" @click="exportInvoices">Export  CSV</button>
<h3 class="ms-5">Invoices </h3>
 <div class="container ">

  

 
      <table  class="table small table-bordered">
         <thead class="fix">
          <tr>
        <th> Client<input class="input" type="text" placeholder="filter" v-model="fullName"></th>
        <th>  Seller<input class="input" type="text" placeholder="filter" v-model="companyName"></th>
        <th> Products</th>
        <th> Totalprice <button class="mybutton" @click="toggleOrder">{{ updown }}</button></th>
        <th> Actions</th>
      </tr>
       </thead>
     
    <tr  v-for="invoice in invoices" :key="invoice._id">
        <td >{{ invoice.client.fullName}}</td>
        <td >{{ invoice.seller.companyName }}</td> 
        <td > <ul>
              <li v-for="product in invoice.products" :key="product._id">
                - {{ product.title }}
              </li>
            </ul>
          </td> 
        <td >{{ invoice.totalPrice }}</td> 
        <td >
          <ul>
           <li><RouterLink class="btn btn-secondary " :to="`invoices/${invoice._id}`">details</RouterLink>
            <button class="btn btn-danger" @click="remove(invoice._id)">delete</button></li>
          </ul></td> 
        
    </tr>
   
 


</table>

</div>
<div class="contai">
  <div class="content">
  <button  type="button" v-for="page in pages"  :key="page" :class="{ active: currentPage === page }"
  @click="setCurrentPage(page)">{{ page }}</button>
  <label for="options">limit:</label>
    <select v-model="selecteLimit" id="options" >
      <option v-for="limit in limits" :key="limit" :value="limit">
        {{limit }}
      </option>
    </select>
  </div>
</div>

<button @click="goToClientForm()" class="btn btn-primary right" >New Invoice</button>
 <br>
 <br>
 <br>

    
    <form  class="right" @submit.prevent="upload"  enctype="multipart/form-data">
    <input type="file" name="file" @change="handleFileUpload" accept=".xlsx">
    <button type="submit">Upload excel</button>
  </form>

</template>
<script setup>
import {watch,ref , onMounted,computed, onUpdated} from 'vue';
import { useRouter } from 'vue-router';
import Modal from './Modal.vue';
import { getInvoices ,deleteById,exportCsv,uploadCsv} from '../axios/invoice.js'

const invoices = ref([]) 
const openModal =ref( false)
const router = useRouter();
const fullName=ref(null)
const companyName =ref(null)
const pages =ref(1)
const currentPage=ref(1)
const order=ref(-1)
const limits =[3,4,5,10]
const selecteLimit=ref(3)
const updown=computed(() => {
console.log(updown.value)
      return order.value === 1?"ASC": "DSC"; 

})



onMounted(()=>fetchInvoices())

const fetchInvoices =async()=>{
  try {const response = await getInvoices(fullName.value,companyName.value,order.value,currentPage.value,selecteLimit.value)
    console.log(response)
    invoices.value=response.invoices
    pages.value=response.totalPages
    //currentPage.value=response.currentPage
    
  }
  catch (error) {
    console.error('Error fetching invoices:', error); 
  }
}
const setCurrentPage=(index) =>{
     currentPage.value = index
    }


const goToClientForm = () => {
  openModal.value=true 
  router.push({ name: 'client' });
};

const remove=async (id)=> {
    if (confirm("Are you sure you want to delete this invoice?")) {
     await deleteById(id)
     await fetchInvoices();
    }
  }

  const exportInvoices=async()=>{
    const response =await exportCsv()
    console.log(response)
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'invoices.csv'); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 
  }

  const upload =async()=>{
    const formdata= new FormData()
    formdata.append('file',selectedFile.value)
   await uploadCsv(formdata)
   await fetchInvoices()
    
  }
  
  const toggleOrder = () => {
      order.value = order.value*-1;
    };

  const selectedFile = ref(null)
  const handleFileUpload=($event)=>{
  selectedFile.value=$event.target.files[0]
  }
 
watch(openModal, (newstate) => {
  fetchInvoices();
});
watch(fullName, (newvalue) => {
   fetchInvoices();
});
watch(companyName, (newvalue) => {
  fetchInvoices();
});
watch(order, (newvalue) => {
  fetchInvoices();
});
watch(currentPage, (newvalue) => {
  fetchInvoices();
});
watch(selecteLimit, (newvalue) => {
  fetchInvoices();
});
 
</script>

<style scoped>
.right{
  float: right;
  margin-right: 100px;
 
}

td>ul {
  list-style-type: none;
}

.small{
  height: 400px;
 
margin: 0px auto;
border: 2px solid #616e7b; 
border-radius: 5px;

}
.container{
  max-height: 400px;
  max-width:800px ;
overflow-y: scroll;
}

.table thead th {
            position: sticky; 
            top: 0; 
            background: rgb(180, 176, 176); 
            z-index: 2; 
        }

.input{
 max-width: 100px;
 margin-left: 5px;
}

.mybutton{
  background-color: #616e7b;
  color: white;
  border-radius: 10%;
}
.active {
  background-color: blue; 
  color: white;
  border-radius: 50%;
}

.contai {
  text-align: center;
}


</style>