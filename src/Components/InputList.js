import Component from './component.js';
import store from '../store/store.js';
import {CLAUSES_TYPES} from "../const";
import Clause from "./Clause";
import Value from "./Value";
import { Sortable } from '@shopify/draggable';

export default class InputList extends Component {

    constructor() {
        super({
            store,
            element: document.querySelector('#sqlqb-input-container')
        });
        this.i = 0;
    }

    render() {
        console.log('CALL: ' + this.i);
        console.log('STORE: ', store.state.items.length);
        this.i++;
        if(store.state.items.length === 0) {
            this.element.innerHTML = `<p class="no-items">You've done nothing yet &#x1f622;</p>`;
            return;
        }

        this.element.innerHTML = `
      <ul id="sqlqb-input">
        ${this.generateItems()}
      </ul>
    `;

        /*this.element.querySelectorAll('button').forEach((button, index) => {
            button.addEventListener('click', () => {
                store.dispatch('clearItem', { index });
            });
        });*/

        this.initSortable();
    }

    generateItems() {
        return store.state.items.map(item => {
            console.log(item);
            console.log(CLAUSES_TYPES.VALUE);
            if (item.type === CLAUSES_TYPES.VALUE) {
                let value = new Value(item);
                return value.generator();
            } else {
                let tag = new Clause(item);
                return tag.generator();
            }
        }).join('').trim();
    }

    initSortable() {
        const sortable_input = document.querySelectorAll('#sqlqb-input');

        const sortable = new Sortable(sortable_input, {
            draggable: 'li'
        });
        //sortable.on('sortable:stop', () => commitChanges());
        sortable.on('sortable:start', (event) => event.data.dragEvent.mirror.classList.remove('sqlqb-animation-pulse'));
    }
}