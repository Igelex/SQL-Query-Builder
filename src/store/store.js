import Store from 'beedle';
import {state, mutations, actions} from "./state";

const store = new Store({actions, mutations, state});

export default store;