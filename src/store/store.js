import PubSub from './pubsub';
import {state, actions, mutations} from "./states";

export const Store = (function (){

    const _actions = Symbol();
    const _mutations = Symbol();
    const _state = Symbol();
    const _status = Symbol();
    const _events = Symbol();

    class Store {
        constructor(params) {
            this[_actions] = {};
            this[_mutations] = {};
            this[_state] = {};
            this[_status] = 'resting';

            this[_events] = new PubSub();

            if(params.hasOwnProperty('actions')) {
                this[_actions] = params.actions;
            }

            if(params.hasOwnProperty('mutations')) {
                this[_mutations] = params.mutations;
            }

            this[_state] = new Proxy((params.state || {}), {
                set: function (state, key, value) {
                    state[key] = value;

                    console.log(`stateChange: ${key}: ${value}`);

                    if(!this[_events]) this[_events] = new PubSub();

                    this[_events].publish('stateChange', this[_state]);

                    console.log(`stateChange: ${key}: ${value}`);

                    if(this[_status] !== 'mutation') {
                        console.warn(`You should use a mutation to set ${key}`);
                    }

                    this[_status] = 'resting';

                    return true
                }
            });
        }

        dispatch(actionKey, payload) {
            if(typeof this[_actions][actionKey] !== 'function') {
                console.error(`Action "${actionKey} doesn't exist.`);
                return false;
            }

            console.groupCollapsed(`ACTION: ${actionKey}`);

            this[_status] = 'action';

            this[_actions][actionKey](this, payload);

            console.groupEnd();

            return true;
        }

        commit(mutationKey, payload) {

            if(typeof this[_mutations][mutationKey] !== 'function') {
                console.log(`Mutation "${mutationKey}" doesn't exist`);
                return false;
            }

            this[_status] = 'mutation';

            let newState = this[_mutations][mutationKey](this[_state], payload);

            this[_state] = Object.assign(this[_state], newState);

            return true;
        }
    }
        return new Store({state, actions, mutations});
}());