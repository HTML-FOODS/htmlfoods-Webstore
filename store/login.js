export const state  =() => ({
    userData :[
        {
            email: "",
            password : ""
        }
    ],

})

export const getters =() => ({
    loggedIn(state) {
        return state.userData; 
    }
    
})

export const actions =() => ({
    nuxtServerInit: ({ commit }, { $axios, context, error }) => {
        return (async () => {
          try {
            let token = context.rootState.admin.token;
            console.log("welcome", token);
            const response = await $axios.get(`/api/v1/user/login`, {
              headers: {
                "x-admin-token": token
              }
            });
            await commit("SET_LOGIN", response.data);
          } catch (e) {
            error({ statusCode: 0, message: "network error" });
          }
        })();
      }
    
})

export const mutations =() => ({
    SET_LOGIN(state, isLoggedIn) {
        state.isLoggedIn =isLoggedIn;
    },
})