<template>
  <div class="p-5">
    <h1 class="mb-3">Tenants CRUD Section</h1>
  <div class="form-group">
    <input type="text" class="form-control" v-model="query" @change="search()" placeholder="Search By Name">
  </div>
  
  <b-table striped hover :items="tenants" :fields="fields">
    <template slot="actions" slot-scope="row">

      <b-button size="sm" class="mr-2" @click="openEditModal(row)">
       Edit
      </b-button>
      <b-button size="sm" class="mr-2" :variant="'danger'" @click="removeTenant(row.item._id)">
       Remove
      </b-button>
    </template>
  </b-table>
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
    <b-button :variant="'danger'" @click="showInDebt()">
      In-Debt 
  </b-button>
    <b-button :variant="'success'" @click="showInNoDebt()">
      Debt-Free 
  </b-button>
       <b-button :variant="'primary'" @click="addModal()">
      Add 
  </b-button>
      <b-button :variant="'warning'" @click="clear()">
      Clear filter 
  </b-button>
  </div>
</template>

<script>

export default {
  name: 'Tenants',
  data () {
    return {
      fields: [
        'name','phone','adress','debt','balance','actions'
      ],
      query: null,
      editModalShow: false,
      createModalShow: false,
      tenants: [],
      tenant: {
        name: null,
        phone: null,
        adress: null,
        debt: false,
        balance: 0,
      }
    }
    },
    methods:{
      init() {
        this.$axios.get('http://localhost:27017/tenants/list').then((res) => {
          this.tenants = res.data;
          this.tenants.map((item) => {
            item.actions = 'items'
            if(item.debt == false){
              item.balance = 0
            }
          })
        })
      },
      addModal(){
        this.tenant.name = null
        this.tenant.phone = null
        this.tenant.adress = null
        this.tenant.debt = false
        this.tenant.balance = 0
        if(this.tenant._id){
          delete this.tenant._id
        }
        //this.tenant._id = null
        this.createModalShow = !this.createModalShow
      },
      search(){
        if(!this.query) {
          return this.init()
        }
        this.$axios.get(`http://localhost:27017/tenants/find/${this.query}`).then((res) => {
          this.tenants = res.data
          this.tenants.map((item) => {
            item.actions = 'items'
          })
        })
      },
      showInNoDebt(){
        let _tenants = this.tenants.filter((item) => {
           return item.debt == false     
        })
        this.tenants = _tenants
      },
      showInDebt(){
        let _tenants = this.tenants.filter((item) => {
             return item.debt == true     
        })
        this.tenants = _tenants
      },
      clear(){
        this.init()
        this.query = null
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
           this.createModalShow = !this.createModalShow
           this.tenants.push(res.data)
        })
      },
      updateTenant(){
        let payload = this.tenant
        this.$axios.post(`http://localhost:27017/tenants/update/${payload._id}`, payload).then((res) => {
           this.editModalShow = !this.editModalShow
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
