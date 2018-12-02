const state = {
    items: []
};

const mutations = {
  setInput(state, payload) {
      console.groupCollapsed('[STORE]');
      console.table(payload);
      console.groupEnd();
      state.items = payload;
      return state;
  }
};

const actions = {
    setInput(context, items) {
        setTimeout(() => {
            context.commit('setInput', items);
        }, 200);
    }
};

export {
    state,
    mutations,
    actions
};