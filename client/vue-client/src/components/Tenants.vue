<template>
  <div class="p-5">
    <h1 class="mb-3">Tenants CRUD Section</h1>
  <div class="form-group">
    <input type="text" class="form-control" v-model="query" @change="search()" placeholder="Search By Name">
  </div>
  <b-table striped hover :items="tenants">
    <template slot="actions" slot-scope="row">
      <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
      <b-button size="sm" class="mr-2" @click="openEditModal(row)">
       Edit
      </b-button>
      <b-button size="sm" class="mr-2" :variant="'danger'" @click="removeTenant(row.item._id)">
       Remove
      </b-button>
    </template>
  </b-table>
    <b-button :variant="'primary'" @click="createModalShow = !createModalShow">
      Add 
  </b-button>
  <b-modal ref="modal" hide-footer title="Tenant" v-model="createModalShow">
      <div class="d-block text-center">
        <div class="form-group">
          <input type="text" class="form-control" v-model="tenant.name" name="name" placeholder="Name">
        </div>
        <div class="form-group">
          <input type="tel" class="form-control" v-model="tenant.phone" name="phone" placeholder="Phone">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="tenant.adress" name="adress" placeholder="Address">
        </div>
        <div class="form-group pull-left">
          <label>Debt</label>
            <input type="checkbox" class="form-control" v-model="tenant.debt" name="debt"/>
        </div>
        <div class="form-group" v-if="tenant.debt">
          <input type="text" class="form-control" v-model="tenant.balance" name="name" placeholder="Debt Balance">
        </div>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="createTenant()">Save</b-btn>
    </b-modal>
  
    <b-modal ref="_modal" hide-footer title="Tenant" v-model="editModalShow">
      <div class="d-block text-center">
        <div class="form-group">
          <input type="text" class="form-control" v-model="tenant.name" name="name" placeholder="Name">
        </div>
        <div class="form-group">
          <input type="tel" class="form-control" v-model="tenant.phone" name="phone" placeholder="Phone">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="tenant.adress" name="adress" placeholder="Address">
        </div>
        <div class="form-group pull-left">
          <label>Debt</label>
            <input type="checkbox" class="form-control" v-model="tenant.debt" name="debt"/>
        </div>
        <div class="form-group" v-if="tenant.debt">
          <input type="text" class="form-control" v-model="tenant.balance" name="name" placeholder="Debt Balance">
        </div>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="updateTenant()">Save</b-btn>
    </b-modal>
  </div>
</template>

<script>

export default {
  name: 'Tenants',
  data () {
    return {
      query: null,
      editModalShow: false,
      createModalShow: false,
      tenants: [],
      tenant: {
        name: null,
        phone: null,
        adress: null,
        debt: false,
        balance: 0
      }
    }
    },
    methods:{
      init() {
        this.$axios.get('http://localhost:27017/tenants/list').then((res) => {
          this.tenants = res.data;
          this.tenants.map((item) => {
            item.actions = 'items';
          })
        })
      },
      search(){
        if(!this.query) {
          return this.init()
        }
        this.$axios.get(`http://localhost:27017/tenants/find/${this.query}`).then((res) => {
          this.tenants = res.data;
          this.tenants.map((item) => {
            item.actions = 'items';
          })
        })
      },
      openEditModal(row){
        let _tenant = {}
        _tenant = Object.assign(_tenant, row.item)
        this.tenant = _tenant 
        this.editModalShow = !this.editModalShow; 
      },
      createTenant(){
        let payload = this.tenant
        this.$axios.post(`http://localhost:27017/tenants/create`, payload).then((res) => {
           this.createModalShow = false
           this.tenants.push(res.data)
        })
      },
      updateTenant(){
        let payload = this.tenant
        this.$axios.post(`http://localhost:27017/tenants/update/${payload._id}`, payload).then((res) => {
           this.editModalShow = false
           this.init()
        })
      },
      removeTenant(id){
        this.$axios.post(`http://localhost:27017/tenants/delete/${id}`).then((res) => {
           this.init()
        })
      }
    },
    mounted(){
      this.init()
    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
