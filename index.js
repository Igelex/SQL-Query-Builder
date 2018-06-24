import 'bootstrap';
import 'popper.js';
import 'jquery';
import 'jquery-ui-bundle';
//import '@fortawesome/fontawesome-free/js/all.js';
//import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

$(document).ready(() => {
    let clauses = $('.clause, .operator');
    let clause_value = $('.clause_value');
    let input = $('#sql_input');

    const addClauseValueInput = (value = "") => {
        const clause_value_container =
            $(`<div class="clause_value_container ">
                <input type="text" class="value_input clause_tag_selected" placeholder="Enter value" value="${value}">
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
            updateOutput();
        });
        updateOutput();
    };

    const addClause = (text, elem) => {
        const clause_item = $(`<li class="sortable_clauses"></li>`);
        const clause_tag = $(`<span class="clause_tag clause_tag_selected">${text}</span>`);
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

        $('.clause_tag_selected').each( (i, item) => {
            if($(item).is('input')) {
                output += `${$(item).val()} `;
            } else {
                output += `${$(item).text()} `;
            }
        });

        $('#sql_query_output').text(output);

    };

    //Add initial Clauses
    addClause('SELECT', clauses[0]);
    addClauseValueInput('first_name');
    addClauseValueInput('last_name');
    addClause('FROM',clauses[1]);

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
});
