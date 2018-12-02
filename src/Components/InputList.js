import Component from './component.js';
import store from '../store/store.js';
import {CLAUSES} from "../const";
import Clause from "./Clause";
import Value from "./Value";

export default class InputList extends Component {

    constructor() {
        super({
            store,
            element: document.querySelector('#sqlqb-input-container')
        });
    }

    render() {
        if(store.state.items.length === 0) {
            this.element.innerHTML = `<p class="no-items">You've done nothing yet &#x1f622;</p>`;
            return;
        }

        this.element.innerHTML = `
      <ul id="sqlqb-input">
        ${this.generateItems()}
      </ul>
    `;

        this.element.querySelectorAll('button').forEach((button, index) => {
            button.addEventListener('click', () => {
                store.dispatch('clearItem', { index });
            });
        });
    }

    generateItems() {
        store.state.input.map(item => {
            if (item.type === CLAUSES.VALUE) {
                let value = new Value(item);
                return value.generator();
            } else {
                let tag = new Clause(item);
                return tag.generator();
            }
        }).join('');
    }
};