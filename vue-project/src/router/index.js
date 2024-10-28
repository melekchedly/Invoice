import { createRouter, createWebHistory } from 'vue-router'
import Invoices from '../views/invoices.vue'
import ClientForm from '../views/ClientForm.vue'
import ProductForm from '@/views/ProductForm.vue'
import sellerForm from '@/views/sellerForm.vue'
import InvoiceDetails from '@/views/InvoiceDetails.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/invoices',
      name: 'invoice',
      component: Invoices,
      children: [
        {
          path: '/client',
          name: 'client',
          component: ClientForm,
        },
        {
          path: '/seller',
          name: 'seller',
          component: sellerForm,
        },
        {
          path: '/product',
          name: 'product',
          component: ProductForm,
        }
      ],
    },
    {
    path: '/invoices/:id',
    name: 'details',
    component: InvoiceDetails}
  ]
})

export default router
