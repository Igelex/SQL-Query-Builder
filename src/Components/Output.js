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

        this.element.innerHTML = this.renderOutput();
        this.element.addEventListener('click', ()=> {
            this.copyOutput();
        });
    }

    renderOutput() {
        return store.state.items.map((item, i) => {
            if (item.type === CLAUSES_TYPES.VALUE) {
                return this.generateValue(item);
            } else if(item.type === CLAUSES_TYPES.CLAUSE){
                return this.generateClause(item, i);
            } else if(item.type === CLAUSES_TYPES.OPERATOR){
                return this.generateOperator(item);
            }
        }).join('').trim() + this.appendSemicolon() + this.appendHiddenInput();
    }

    generateClause(item, position) {
        return `${(item.block && position > 0) ? '</br>' : ''} <span class="sqlqb-output-${item.type}">${item.name.toUpperCase()}</span>`;
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

    appendHiddenInput() {
        return `<input id="sqlqb-hidden-input" type="text">`;
    }

    copyOutput() {
        const hidden_input = this.element.querySelector('#sqlqb-hidden-input');

        hidden_input.value = store.state.items.map(item => {
            switch (item.type) {
                case CLAUSES_TYPES.CLAUSE || CLAUSES_TYPES.OPERATOR:
                    return item.name.toUpperCase();
                case CLAUSES_TYPES.VALUE:
                    return `"${item.value ? item.value : 'no value'}"`;
            }
        }).join(' ') + ';';

        hidden_input.select();

        try {
            document.execCommand('copy');
        } catch (copy_error) {
            console.log({copy_error});
        }
    }
}