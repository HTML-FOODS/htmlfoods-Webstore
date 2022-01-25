import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    token: store.state.admin.token
  })(store);
};
