export class Value {

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
                        style="${this.item.value ? '' : 'display: inline;'}"
                        value="${this.item.value ? this.item.value : ''}">`;
    }

    generateValueTag() {
        return `<span class="sqlqb-tag sqlqb-tag-value" 
                      style="${this.item.value ? '' : 'visibility: hidden;'}">
                      ${this.item.value ? this.item.value : 'no value'}
                </span>`;
    }

    generateRemoveButton() {
        return `<span class="sqlqb-tag-controls sqlqb-tag-controls-remove">&times;</span>`;
    }

    generateAddButton() {
        return `<span class="sqlqb-tag-controls sqlqb-tag-controls-add">+</span>`;
    }
}

export function addValueEventListeners(parent) {
    const values_tag = parent.querySelectorAll('li[data-clause-id="1"]');
    console.log(values_tag);

    values_tag.forEach(tag => {

        const values_span = tag.querySelector('.sqlqb-tag-value');
        const values_input = tag.querySelector('.sqlqb-value-input');

        tag.addEventListener('dblclick', () => {
            values_span.style.visibility = 'hidden';
            values_input.style.display = 'inline';

            values_input.value = values_span.textContent.trim();
        });

        values_input.onblur = () => {
            if (!values_input.value) {
                return;
            }

            values_span.style.visibility = 'visible';
            values_span.textContent = values_input.value.trim();
            values_input.style.display = 'none';
        };
    });
}