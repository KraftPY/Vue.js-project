import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customers: [],
    users: [
      {
        id: 11,
        email: "admin@site.com",
        password: "Qaz123",
        firstName: "Fred",
        lastName: "Bred"
      }, {
        id: 22,
        email: "root@site.com",
        password: "root",
        firstName: "Bredasdasdasd",
        lastName: "Fredadasdadas"
      }
    ],
    authUser: null
  },
  mutations: {
    updateCustomers(state, data) {
      state.customers = data;
    },
    deleteCustomer(state, id) {
      state.customers = state.customers.filter(el => el.id != id);
    },

    changeCustomerData(state, customer) {
      const oldData = state.customers.find(el => el.id == customer.id);
      for (const key in oldData) {
        oldData[key] != customer[key] ? oldData[key] = customer[key] : false;
      }
    },

    addNewCustomers(state, customer) {
      let newId = 0;
      do {
        newId = Math.floor(Math.random() * (1000000000));
      } while (state.customers.find(el => el.id == newId));
      customer.id = String(newId);
      state.customers.push(customer);
    },

    logout(state) {
      state.authUser = null;
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
    },

    editCustomer(ctx, customer) {
      ctx.commit("changeCustomerData", customer);
    },
    createCustomer(ctx, customer) {
      ctx.commit("addNewCustomers", customer);
    },
    logoutUser(ctx) {
      ctx.commit("logout");
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
    },
    checkUser: state => user => {
      state.authUser = state.users.find(el => (el.email == user.email && el.password == user.password)) || null;
      return state.authUser;
    },
    isAuthUser(state) {
      if (state.authUser) {
        return true;
      } else {
        return false;
      }
    }
  },
  modules: {
  }
})
