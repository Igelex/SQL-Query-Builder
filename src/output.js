import {CLAUSES, CLAUSES_TYPES} from "./const";
import Store from "./store/store";

/**
 * This method build SQL query string and show it in output container, calls avery time if user make some changes in
 * input
 */
let output_container = null;
let text_to_copy = '';

Store.events.subscribe('stateChange', ()=> {
    out(Store.state.input);
});

function out(out) {
    console.warn({out});
}


export default (elements) => {
    if (!output_container) {
        output_container = $('#sqlqb-output');
        output_container.click(copyOutput);
    }

    output_container.empty(); //clear container

    text_to_copy = '';

    elements.forEach((item, i) => {

        let clause = CLAUSES[item.id];
        let text = '';

        if (clause.type === CLAUSES_TYPES.VALUE && item.payload) text = `"${item.payload ? item.payload : 'Enter value'}"`;
        else {
            text = clause.name.toUpperCase();
        }

        let elem = $(`<span class="sqlqb-output-${clause.type}">${text}</span>`);// clause or value that must be highlighted will be stored in <span>

        output_container.append(elem);

        //add new line
        if (clause.block && i > 0) {
            elem.before('<br>');
        }

        text_to_copy += text_to_copy.length === 0 ? `${text.trim()}` : ` ${text.trim()}`; //update output text, that can be copied

    });
    output_container.append('<span class="sqlqb-output-clause">;</span>'); // close query with ;
};

/**
 * copy SQL query output to the clipboard
 */
function copyOutput() {

    console.warn({text_to_copy});

    let hidden_input = $('<input type="text">');//create fake input element to copy text to clipboard
    $('body').append(hidden_input);
    hidden_input.val(`${text_to_copy};`).select();
    try {
        document.execCommand('copy');
    } catch (copy_error) {
        console.log({copy_error});
    }
    hidden_input.remove();
}

export const getOutputAsText = () => text_to_copy;