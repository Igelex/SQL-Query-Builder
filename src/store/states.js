const state = {
    input: []
};

const mutations = {
  setInput(state, payload) {
      console.table(payload);
      state.input = payload;
      return state;
  }
};

const actions = {
    setInput(context) {
        setTimeout(() => {
            context.commit('setInput', [...$('#sqlqb-input').children('.sqlqb-input-item')].map((elem) => ({
                id: $(elem).attr('data-clause-id'),
                payload: $(elem).children().first().text()
            })));
        }, 200);
    }
};

export {
    state,
    mutations,
    actions
}