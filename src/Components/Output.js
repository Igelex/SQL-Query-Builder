import Component from './component.js';
import store from '../store/index.js';
import {CLAUSES, CLAUSES_TYPES} from "../const";

export default class Output extends Component {

    constructor() {
        super({
            store,
            element: document.querySelector('#sqlqb-output')
        });
    }

    render() {
        if (!store.state.items || store.state.items.length === 0) {
            this.element.innerHTML = `<p class="no-items">You've done nothing yet &#x1f622;</p>`;
            return;
        }

        this.element.innerHTML = this.renderOutput(); // store.state.items.toString();
    }

    renderOutput() {
        return store.state.items.map(item => {
            if (item.type === CLAUSES_TYPES.VALUE) {
                return this.generateValue(item);
            } else if(item.type === CLAUSES_TYPES.CLAUSE){
                return this.generateClause(item);
            } else if(item.type === CLAUSES_TYPES.OPERATOR){
                return this.generateOperator(item);
            }
        }).join('').trim() + this.appendSemicolon();
    }

    generateClause(item) {
        return `${item.block ? '</br>' : ''} <span class="sqlqb-output-${item.type}">${item.name.toUpperCase()}</span>`;
    }

    generateOperator(item) {
        return `<span class="sqlqb-output-${item.type}">${item.name.toUpperCase()}</span>`;
    }

    generateValue(item) {
        return `<span class="sqlqb-output-${item.type}">"${item.value}"</span>`;
    }

    appendSemicolon() {
        return `<span class="sqlqb-output-clause">;</span>`;
    }
}