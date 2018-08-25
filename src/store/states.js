const state = {
    input: []
};

const mutations = {
  setInput(state, payload) {
      console.warn({state});
      state.input = payload;
      return state;
  }
};

const actions = {
    setInput(context, payload) {
        console.warn({context});
        context.commit('setInput', payload);
    }
};

export {
    state,
    mutations,
    actions
}