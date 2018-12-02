import {CLAUSES, CLAUSES_TYPES} from "./const";
import store from "./store/index";

/**
 * This method build SQL query string and show it in output container, calls avery time if user make some changes in
 * input
 */
let output_container = null;
let text_to_copy = '';

store.subscribe(() => {
    //console.log('CHANG');
});
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