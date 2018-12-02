import {CLAUSES} from "../const";

export default class Clause {

    constructor(item = {}) {
        this.item = item;
    }

     generator() {
        return `
      <li data-clause-id="${this.item.id}" class="sqlqb-input-item sqlqb-animation-pulse">
          ${this.generateTag()}
          ${this.generateRemoveButton()}
          ${this.generateAddButton()}
      </li>`;
    }

    generateTag() {
        return `
            <span class="sqlqb-tag 
                  sqlqb-tag-clause 
                  ${this.item.type === CLAUSES.CLAUSE ? 'sqlqb-tag-clause' : 'sqlqb-tag-operator'}">
                  ${CLAUSES[id].name.toUpperCase()}
            </span>
        `
    }

    generateRemoveButton() {
        return `<span class="sqlqb-tag-controls sqlqb-tag-controls-remove">&times;</span>`
    }

    generateAddButton() {
        return `<span class="sqlqb-tag-controls sqlqb-tag-controls-add">&times;</span>`
    }
};

