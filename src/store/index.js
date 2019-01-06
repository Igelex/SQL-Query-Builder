import Store from "beedle";

const index = {
    items: [
        {
            id: 1,
            type: 'clause',
            block: false,
            name: 'select',
            value: '',
        },
        {
            id: 0,
            type: 'value',
            block: false,
            name: 'Enter Value',
            value: 'user',
        },
        {
            id: 2,
            type: 'clause',
            block: false,
            name: 'from',
            value: '',
        },
        {
            id: 0,
            type: 'value',
            block: false,
            name: 'Enter Value',
            value: 'users',
        },]
};

const mutations = {
    setInput(state, payload) {
        console.info(payload);
        console.groupCollapsed('[STORE]');
        console.table(payload);
        console.groupEnd();
        state.items = payload;
        return state;
    },

    removeItem(state, position) {
        state.items.splice(position, 1);
        return state;
    },

    addItem(state, item) {
        state.items.push(item);
        return state;
    },
};

const actions = {
    setInput(context, items) {
        context.commit('setInput', items);
    },
    removeItem(context, position) {
        context.commit('removeItem', position);
    },
    addItem(context, item) {
        context.commit('addItem', item);
    }
};

export default new Store({actions, mutations, state: index});
