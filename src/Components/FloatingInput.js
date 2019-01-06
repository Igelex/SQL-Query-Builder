export default class FloatingInput {

    constructor(item = {}) {
        this.item = item;
    }

    generator() {
        return `<li id="sqlqb-floating-input-container" data-clause-id="${this.item.id}">
                  <span class="sqlqb-tag-controls sqlqb-tag-controls-add">&#10542;</span>
                  <form>
                    <input type="text" class="sqlqb-floating-input">
                  </form>
                  <div id="sqlqb-floating-input-items-container"></div>
               </li>`;
    }
}