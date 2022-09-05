// import VuexPersistence from "vuex-persist";

export const state = () => ({
  location: null,
});


export const mutations = {
  setLocation(state, storeLocation) {
    state.location = storeLocation;
  },
};
