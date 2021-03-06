import {CLAUSES, CLAUSES_TYPES} from "../const";
import {Value} from "./Value";
import {addClausesEventListeners, Clause} from "./Clause";
import store from '../store/index.js';

export class FloatingInput {

    constructor(item = {}) {
        this.item = item;
    }

    generator() {
        return `<li id="sqlqb-floating-input-container" data-clause-id="${this.item.id}">
                  <span class="sqlqb-tag-controls sqlqb-tag-controls-add">&#10542;</span>
                  <form id="sqlqb-floating-form">
                    <input id="sqlqb-floating-input" required autofocus type="text" class="sqlqb-floating-input" autocomplete="off">
                  </form>
                  <div id="sqlqb-floating-input-items-container"></div>
               </li>`;
    }
}

export function addFloatingInputEventsListeners() {
    const elem = document.getElementById('sqlqb-floating-input');
    const container = document.getElementById('sqlqb-floating-input-items-container');
    const form = document.getElementById('sqlqb-floating-form');
    let filtered_clauses = [];
    elem.focus();

    elem.addEventListener('keyup', () => {
        filtered_clauses = CLAUSES.filter(clause => clause.name.toLowerCase().includes(elem.value.toLowerCase()));

        if (filtered_clauses.length === 0 || !elem.value) {
            container.style.display = 'none';
            return;
        }

        container.innerHTML = `${generateItems(filtered_clauses)}`;

        const clauses = container.querySelectorAll('.sqlqb-input-item');
        addClausesEventListeners(clauses);

        container.style.display = 'block';
        container.style.opacity = '1';
    });

    elem.onblur = () => {
        setTimeout(()=> {
            container.innerHTML = '';
            container.style.display = 'none';
        }, 300);
        container.style.opacity = '0';
        filtered_clauses = [];
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let position = 0;

        store.state.items.forEach((item, i) => {
            if (item.type === CLAUSES_TYPES.FLOATING) {
                position = i;
            }
        });

        if (filtered_clauses.length !== 0) {
            store.dispatch('addItemOnPosition', {item: filtered_clauses[0], position});
        } else if (elem.value) {
            store.dispatch('addItemOnPosition', {
                item: {
                    id: 1,
                    type: CLAUSES[1].type,
                    block: CLAUSES[1].block,
                    name: CLAUSES[1].name,
                    value: elem.value,
                },
                position
            });
        }
    });
}

function generateItems(clauses) {
    return clauses.map(item => {
        if (item.type === CLAUSES_TYPES.VALUE) {
            const value = new Value(item);
            return value.generator();
        } else if (item.type === CLAUSES_TYPES.CLAUSE || item.type === CLAUSES_TYPES.OPERATOR) {
            const tag = new Clause(item);
            return tag.generator();
        }
    }).join('').trim();
}