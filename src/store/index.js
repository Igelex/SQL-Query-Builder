import Store from "beedle";

const state = {
    items: [
        {
            id: 2,
            type: 'clause',
            block: false,
            name: 'select',
            value: '',
        },
        {
            id: 1,
            type: 'value',
            block: false,
            name: 'Enter Value',
            value: 'user',
        },
        {
            id: 3,
            type: 'clause',
            block: false,
            name: 'from',
            value: '',
        },
        {
            id: 1,
            type: 'value',
            block: false,
            name: 'Enter Value',
            value: 'users',
        },]
};

const mutations = {
    setInput(state, payload) {
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

    addItemOnPosition(state, {item, position}) {
        console.log(item, position);
        state.items.splice(position, 0, item);
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
    },
    addItemOnPosition(context, {item, position}) {
        context.commit('addItemOnPosition', {item, position});
    }
};

export default new Store({actions, mutations, state});
