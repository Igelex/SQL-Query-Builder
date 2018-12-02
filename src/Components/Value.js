export default class Value {

    constructor(item = {}) {
        this.item = item;
    }

    generator() {
        return `
      <li data-clause-id="${this.item.id}" class="sqlqb-input-item sqlqb-animation-pulse">
          ${this.generateValueInput()}
          ${this.generateValueTag()}
          ${this.generateRemoveButton()}
          ${this.generateAddButton()}
      </li>`;
    }

    generateValueInput() {
        return `<input data-type="clause-value" 
                        type="text" 
                        class="sqlqb-value-input value-input-selected" 
                        placeholder="Enter value" 
                        value="${this.item.name ? this.item.name : ''}">`;
    }

    generateValueTag() {
        return `<span class="sqlqb-tag sqlqb-tag-value">${this.item.value ? this.item.value : 'Enter value'}`;
    }

    generateRemoveButton() {
        return `<span class="sqlqb-tag-controls sqlqb-tag-controls-remove">&times;</span>`;
    }

    generateAddButton() {
        return `<span class="sqlqb-tag-controls sqlqb-tag-controls-add">&times;</span>`;
    }
}