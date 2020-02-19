import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customers: []
  },
  mutations: {
    updateCustomers(state, data) {
      state.customers = data;
    },
    deleteCustomer(state, id) {
      state.customers = state.customers.filter(el => el.id != id);
    }
  },
  actions: {
    async fetchCustomersData(ctx, num = 10) {
      const arrProf = ["Sale Manager", "Programmist", "Banker", "Barber", "Doctor", "Economist", "Teacher", "Police officer", "Mechanic", "Farmer"];
      const data = await fetch(`https://randomuser.me/api/?results=${num}`)
        .then(res => res.json())
        .then(d => {
          return d.results.map((el) => {
            return {
              id: el.login.uuid.split("-")[0],
              firstName: el.name.first,
              lastName: el.name.last,
              email: el.email,
              birthday: new Date(el.dob.date).toISOString().substr(0, 10),
              proffesion: arrProf[Math.floor(Math.random() * (arrProf.length))],
              rating: Math.floor(Math.random() * (6 - 1) + 1),
              foto: el.picture.large
            }
          });
        });
      ctx.commit("updateCustomers", data);
    },

    removeCustomer(ctx, id) {
      ctx.commit("deleteCustomer", id);
    }
  },
  getters: {
    AllCustomers(state) {
      return state.customers;
    },
    customersCount(state) {
      return state.customers.length;
    },
    customerData: state => id => {
      return state.customers.find(el => el.id == id);
    }
  },
  modules: {
  }
})
