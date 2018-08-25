import {CLAUSES, CLAUSES_TYPES} from "./const";
import {buildTag} from "./element_builder";

const floating_input_container = $(`<div id="sqlqb-floating-input-container"></div>`);
const floating_input = $(`<input type="text" class="sqlqb-floating-input">`);
const items_container = $(`<div id="sqlqb-floating-input-items-container"></div>`);
floating_input_container.append(floating_input);
floating_input_container.append(items_container);

floating_input.keyup(() => {
    items_container.empty();
    let filtered_clauses = CLAUSES.filter(clause => clause.name.toLowerCase().includes(floating_input.val().toLowerCase()));

    if (filtered_clauses.length === 0) return;

    items_container[0].style.display = 'block';

    for (let i = 0; i < filtered_clauses.length; i++) {

        if(i > 5) break;

        const item = $(`<span class="sqlqb-floating-item"></span>`);

        item.append(buildTag(filtered_clauses[i], filtered_clauses[i].id));
        items_container.append(item);
    }
});

floating_input.blur(() => {
    items_container.empty();
    items_container[0].style.display = 'none';
});

export default floating_input_container;