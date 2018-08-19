import {CLAUSES, CLAUSES_TYPES} from "./const";
import {Store} from './store';

export function inputElement(id, text) {
    let clause = CLAUSES[id];

    switch (clause.type) {
        case CLAUSES_TYPES.ClAUSE:
            return inputClauseElement(id);
        case CLAUSES_TYPES.VALUE:
            return inputClauseValueElement(id, text);
        case CLAUSES_TYPES.OPERATOR:
            return inputClauseElement(id);
    }
}

export const inputClauseElement = (id) => {
    let clause_tag = buildClauseElement(id);
    appendPlusControl(clause_tag);
    return clause_tag;
};

/**
 * Adds new clause value input to the input container
 * @param name - optional value, that can be displayed in input
 */
export const inputClauseValueElement = (id, name) => {
    let clause_value_input = buildClauseValueElement(id, name);
    appendPlusControl(clause_value_input);
    return clause_value_input;
};

const buildClauseElement = (id) => {
    const clause_li_item = $(`<li data-clause-id="${id}" class="sqlqb-input-item sqlqb-animation-pulse"></li>`);
    const clause_tag = $(`<span class="sqlqb-tag sqlqb-tag-clause">${CLAUSES[id].name.toUpperCase()}</span>`);
    const remove_clause_icon = $(`<span class="sqlqb-tag-controls sqlqb-tag-controls-remove">&times;</span>`);

    clause_li_item.append(clause_tag);
    clause_li_item.append(remove_clause_icon);

    if (CLAUSES[id].type === CLAUSES_TYPES.OPERATOR) {
        clause_tag.addClass('sqlqb-tag-operator');
        clause_tag.removeClass('sqlqb-tag-clause');
    }

    $(remove_clause_icon).click(() => {
        $(clause_li_item).fadeOut(300, () => {
            clause_li_item.remove();
            Store.commit();
        });
    });
    return clause_li_item;
};

const buildClauseValueElement = (id, name = '') => {
    const clause_value_input =
        $(`<input data-type="clause-value" type="text" class="sqlqb-value-input value-input-selected" placeholder="Enter value" value="${name ? name : ''}">`);
    const remove_clause_icon = $(`<span class="sqlqb-tag-controls sqlqb-tag-controls-remove">&times;</span>`);
    const value_tag = $(`<span class="sqlqb-tag sqlqb-tag-value">${name ? name : 'Enter value'}</span>`);
    const li_item = $(`<li data-clause-id="${id}" class="sqlqb-input-item sqlqb-animation-pulse"></li>`);

    li_item.append(value_tag);
    li_item.append(remove_clause_icon);
    li_item.append(clause_value_input);

    toggleValueInput(clause_value_input, value_tag);

    remove_clause_icon.click(() => {
        li_item.fadeOut(300, () => {
            li_item.remove();
            Store.commit();
        });
    });

    clause_value_input.focus();
    clause_value_input.blur(() => {
        Store.commit();
    });
    clause_value_input.keypress(() => {
        //Store.commit();
    });
    return li_item;
};

/**
 * Hide or show input field on dbclick/unfocused
 * @param input
 * @param span
 */
const toggleValueInput = (input, span) => {

    span.dblclick(() => {
        span.css({'visibility': 'hidden'});
        input.fadeToggle().focus();
    });

    input.blur(() => {
        if (!input.val() || input.val() === '') {
            return;
        }
        span.text(input.val());
        span.css({'visibility': 'visible'});
        input.fadeToggle();
    });

    if (span.text() === 'Enter value') {
        span.css({'visibility': 'hidden'});
        input.css({'display': 'inline'});
        input.focus();
    }

};

/**
 * Adds a plus button between clauses in @input_container, that allows adding clauses between clauses on click
 * @param container - current <li> element in the sortable list of clauses
 */
const appendPlusControl = (container) => {
    let placeholder_button = $('<span title="add new tag" class="sqlqb-tag-controls sqlqb-tag-controls-add">+</span>'); //template
    $(container).append(placeholder_button); //append template to the current <li>
};