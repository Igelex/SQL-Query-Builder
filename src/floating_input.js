import {CLAUSES, CLAUSES_TYPES} from "./const";
import {buildTag, inputElement} from "./element_builder";

const floating_input_container = $(`<div id="sqlqb-floating-input-container"></div>`);
const floating_form = $(`<form><input type="text" class="sqlqb-floating-input"></form>`);
const floating_input = floating_form.find('input');
const items_container = $(`<div id="sqlqb-floating-input-items-container"></div>`);
floating_input_container.append(floating_form);
floating_input_container.append(items_container);

let filtered_clauses = [];

floating_input.keyup(() => {
    items_container.empty();
    filtered_clauses = CLAUSES.filter(clause => clause.name.toLowerCase().includes(floating_input.val().toLowerCase()));

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

floating_form.submit((event) => {
    event.preventDefault();
    let first_element = filtered_clauses[0];

    let new_element = inputElement(first_element.id, first_element.type === CLAUSES_TYPES.VALUE ? null : first_element.name);
    new_element.insertBefore(floating_input_container);

    items_container.empty();
    items_container[0].style.display = 'none';

    floating_input_container.val('');
    floating_input_container.focus();
});

export default floating_input_container;