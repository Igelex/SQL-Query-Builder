const state = {
    input: []
};

const mutations = {
  setInput(state, payload) {
      state.input = payload;
      return state;
  }
};

const actions = {
    setInput(context, payload) {
        context.commit('setInput', payload);
    }
};

export {
    state,
    mutations,
    actions
}