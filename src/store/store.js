import Store from 'beedle';
import {state, mutations, actions} from "./states";

const store = new Store({actions, mutations, state});

export default store;