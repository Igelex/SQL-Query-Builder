import 'bootstrap';
import 'popper.js';
import 'jquery-ui-bundle';
//import '@fortawesome/fontawesome-free/js/all.js';
//import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

$(document).ready(() => {
    let clauses = $('.clause, .operator');
    let clause_value = $('.clause_value');
    let input = $('#sql_input');

    const addClauseValueInput = (value = "", elem) => {
        const clause_value_container =
            $(`<div class="clause_value_container ">
                <input data-type="${$(elem).attr('data-type')}" type="text" class="value_input clause_tag_selected" placeholder="Enter value" value="${value}">
              </div>`);
        const remove_clause_icon = $(`<span class="remove_clause">&times;</span>`);
        const li_item = $(`<li class="sortable_clauses"></li>`);

        let new_clause_value = clause_value_container.append(remove_clause_icon);

        remove_clause_icon.dblclick(() => {
            li_item.fadeOut( 300, () => {
                li_item.remove();
                updateOutput();
            });
        });
        input.append($(li_item).append(new_clause_value));

        let value_input = li_item.find('.value_input');
        value_input.focus();
        value_input.blur(() =>{
            updateOutput();
        });
        value_input.keypress(() => {
            //setTimeout(100, updateOutput());
            updateOutput();
        });
        updateOutput();
    };

    const addClause = (text, elem) => {
        const clause_item = $(`<li class="sortable_clauses"></li>`);
        const clause_tag = $(`<span data-type="${$(elem).attr('data-type')}" class="clause_tag clause_tag_selected">${text}</span>`);
        const remove_clause_icon = $(`<span class="remove_clause clause_tag">&times;</span>`);

        if ($(elem).is('.operator')) {
            remove_clause_icon.addClass('operator');
            clause_tag.addClass('operator');
        }
        $(remove_clause_icon).click(() => {
            $(clause_item).fadeOut( 300, () => {
                clause_item.remove();
                updateOutput();
            });
        });
        clause_item.append(clause_tag);
        clause_item.append(remove_clause_icon);
        input.append(clause_item);
        updateOutput();
    };

    const updateOutput = () => {
        let output = '';
        let output_container = $('#sql_query_output');
        output_container.empty();

        let query_items = $('li [data-type]');

        query_items.each( (i, item) => {

            let elem = $('<span></span>');// clause or value, that must be highlighted

            if($(item).is('input')) {
                elem.text($(item).val());
                elem.addClass('output_value');
            } else {
                if ($(item).is('[data-type^="operator"]')) {
                    elem.addClass('output_operator');
                } else {
                    elem.addClass('output_clause');
                }
                elem.text($(item).text());
            }
            output_container.append(elem);
            if ($(item).is('[data-type$="block"]') && i > 0) {elem.before('<br>');}
        });
        output_container.append('<span class="output_clause">;</span>')
    };

    //Add initial Clauses
    addClause('SELECT', clauses[0]);
    addClauseValueInput('first_name', clause_value[0]);
    addClauseValueInput('last_name', clause_value[0]);
    addClause('FROM',clauses[1]);
    addClauseValueInput('users', clause_value[0]);
    addClause('WHERE',clauses[2]);

    clause_value.click(() =>{
        addClauseValueInput();
    });

    $(clauses).each(function () {
        $(this).click(function () {
            addClause($(this).text(), this);
        });
    });

    $(input).sortable({
        revert: true
    });
    $(clauses).draggable({
        connectToSortable: '#sql_input',
        helper: "clone",
        revert: "invalid"
    });
    $('ul, li').disableSelection();

    $('.copy_output_icon').click( () => {
        let copied_text = '';

        $('#sql_query_output span').each( (i, item) => {
            copied_text += `${item.textContent.trim()} `;
        });
        let hidden_input = $('<input type="text">');//create input element to copy text to clipboard
        $('body').append(hidden_input);
        hidden_input.val(copied_text).select();
        console.warn(hidden_input.val());

        try {
            document.execCommand("copy");
            console.warn(copied_text);
        } catch(e) {
            console.log(e);
        }
        hidden_input.remove();
    });
});
