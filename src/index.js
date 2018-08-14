import 'jquery-ui-bundle';
import '../styles/containers.scss';
import '../styles/style.scss';
import 'normalize.css';
import {init} from './init';

export function showBuilder(container) {
    init(container);
}
function fn () {

    /**
     * This method build SQL query string and show it in output container, calls avery time if user make some changes in
     * input
     */
    const updateOutput = () => {
        let output_container = $('#query-builder-output');
        output_container.empty(); //clear container

        //TODO: change that for DIVA
        let query_items = $('li [data-type]'); //get all clauses, added by user

        query_items.each((i, item) => {

            let elem = $('<span></span>');// clause or value that must be highlighted will be stored in <span>

            if ($(item).is('input')) {
                elem.text($(item).val());
                elem.addClass('output_value');
            } else {
                if ($(item).is('[data-type^="operator"]')) {
                    elem.addClass('output-operator');
                } else {
                    elem.addClass('output-clause');
                }
                elem.text($(item).text());
            }
            output_container.append(elem);
            if ($(item).is('[data-type$="block"]') && i > 0) {
                elem.before('<br>');
            }
        });
        output_container.append('<span class="output-clause">;</span>'); // close query with ;
    };

    /**
     * copy SQL query output to the clipboard
     */
    $('#query-builder-copy-icon').click(() => {
        let copied_text = '';

        $('#query-builder-output span').each((i, item) => {
            copied_text += `${item.textContent.trim()} `; // get text of all spans in output
        });
        let hidden_input = $('<input type="text">');//create input element to copy text to clipboard
        $('body').append(hidden_input);
        hidden_input.val(copied_text).select();
        try {
            document.execCommand("copy");
        } catch (e) {
            console.log(e);
        }
        hidden_input.remove();
    });
}
//SELECT 1,2 FROM users WHERE id <= 5 AND age >= 25 AND (name = 'some_name' OR name = ''another_name)
