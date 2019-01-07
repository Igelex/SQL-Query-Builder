import {CLAUSES, CLAUSES_TYPES} from "../const";
import store from "../store";

export class Clause {

    constructor(item = {}) {
        this.item = item;
    }

     generator() {
        return `
      <li data-clause-id="${this.item.id}" class="sqlqb-input-item ${this.item.new ? 'sqlqb-animation-pulse' : ''}">
          ${this.generateTag()}
          ${this.generateRemoveButton()}
          ${this.generateAddButton()}
      </li>`;
    }

    generateTag() {
        return `
            <span class="sqlqb-tag 
                  ${this.item.type === CLAUSES_TYPES.CLAUSE ? 'sqlqb-tag-clause' : 'sqlqb-tag-operator'}">
                  ${this.item.name.toUpperCase()}
            </span>
        `;
    }

    generateRemoveButton() {
        return `<span class="sqlqb-tag-controls sqlqb-tag-controls-remove">&times;</span>`;
    }

    generateAddButton() {
        return `<span class="sqlqb-tag-controls sqlqb-tag-controls-add">&times;</span>`;
    }
}

export function addClausesEventListeners(clauses) {
    clauses.forEach(clause => {
        clause.addEventListener('click', () => {
            const id = clause.getAttribute('data-clause-id');
            store.dispatch('addItem', {
                id: id,
                type: CLAUSES[id].type,
                block: CLAUSES[id].block,
                name: CLAUSES[id].name,
                value: '',
            });
        });

    });
}

