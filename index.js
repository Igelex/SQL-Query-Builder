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
        const clause_value_template =
            $(`<div class="clause_value_container clause_selected">
                <input type="text" class="value_input" placeholder="Enter value" value="${value}">
              </div>`);
        const remove_clause_template = $(`<span class="remove_clause">&times;</span>`);
        const li_template = $(`<li class="sortable_clauses"></li>`);

        let new_clause_value = clause_value_template.append(remove_clause_template);

        remove_clause_template.click(() => {
            $(li_template).remove();
        });
        input.append($(li_template).append(new_clause_value));
    };

    const addClause = (text, elem) => {
        const clause_li = $(`<li class="sortable_clauses"></li>`);
        const clause_tag = $(`<span class="clause_tag clause_tag_selected">${text}</span>`);
        const remove_clause_icon = $(`<span class="remove_clause clause_tag">&times;</span>`);
        if ($(elem).is('.operator')) {
            remove_clause_icon.addClass('operator');
            clause_tag.addClass('operator');
        }
        $(remove_clause_icon).click(() => {
            $(clause_li).fadeOut( 300, () => {
                clause_li.remove();
            });
        });
        clause_li.append(clause_tag);
        clause_li.append(remove_clause_icon);
        input.append(clause_li);
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
