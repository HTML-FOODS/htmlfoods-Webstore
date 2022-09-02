// import VuexPersistence from "vuex-persist";

export const state = () => ({
  storeUser: null,
  newUser: [],
  token: null,
});


export const mutations = {
  setUser(state, storeUser) {
    state.storeUser = storeUser;
    state.token = storeUser.token;
  },
  setNewUser(state, storeUser) {
    state.newUser = storeUser;
  },
};
export const getters = {
  isSignedIn(state) {
    return state.isSignedIn;
  },
  loggedAdmin(state) {
    return state.admin;
  }
};
