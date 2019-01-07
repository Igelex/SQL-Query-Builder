import Store from "beedle";
import {CLAUSES_TYPES} from "../const";

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

    updateItem(state, {value, position}) {
        state.items[position].value = value;
        return state;
    },

    addItemOnPosition(state, {item, position}) {
        state.items.splice(position, 0, item);
        return state;
    },
};

const actions = {
    setInput(context, items) {
        context.commit('setInput', items);
        log(context.state.items);
    },
    removeItem(context, position) {
        context.commit('removeItem', position);
        log(context.state.items);
    },
    addItemOnPosition(context, {item, position}) {
        context.commit('addItemOnPosition', {item, position});
        log(context.state.items);
    },
    addItem(context, new_item) {

        let floating_input_position = 0;

        context.state.items.forEach((item, i) => {
            if (item.type === CLAUSES_TYPES.FLOATING) {
                floating_input_position = i;
            }
        });

        if (floating_input_position === context.state.items.length - 1){
            context.commit('addItemOnPosition', {item: new_item, position: floating_input_position});
        } else {
            context.commit('addItem', new_item);
        }
        log(context.state.items);
    },
    updateItem(context, {value, position}) {
        context.commit('updateItem', {value, position});
        log(context.state.items);
    },
};

function log(items) {
    console.groupCollapsed('[STORE]');
    console.table(items);
    console.groupEnd();
}

export default new Store({actions, mutations, state});
