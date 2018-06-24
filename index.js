import 'bootstrap';
import 'popper.js';
import 'jquery';
import 'jquery-ui-bundle';
//import '@fortawesome/fontawesome-free/js/all.js';
//import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

$(document).ready(() => {
    let clauses = $('.clause');
    let clause_value = $('.clause_value');
    let input = $('#sql_input');

    const addClauseValueInput = () => {
        const clause_value_template =
            `<div class="clause_value_container clause_selected">
                <input type="text" class="value_input" placeholder="Enter value">
            </div>`;
        const remove_clause_template = `<span class="remove_clause">&times;</span>`;
        const li_template = `<li class="sortable_clauses"></li>`;

        let new_clause_value = $(clause_value_template).append(remove_clause_template);

        $(remove_clause_template).click(() => {
            $(li_template).remove();
        });
        input.append($(li_template).append(new_clause_value));
    };

    const addClause = (text) => {
        const clause_tag = $(`<li class="sortable_clauses"><span class="clause_tag clause_tag_selected">${text}</span></li>`);
        const remove_clause_template = $(`<span class="remove_clause clause_tag">&times;</span>`);
        $(remove_clause_template).click(function() {
            $( clause_tag ).fadeOut( 300, function() {
                clause_tag.remove();
            });
        });
        input.append($(clause_tag).append(remove_clause_template));
    };

    //Add initial Clauses
    addClause('SELECT');
    addClauseValueInput();
    addClause('FROM');

    clause_value.click(() =>{
        addClauseValueInput();
    });

    $(clauses).each(function () {
        $(this).click(function () {
            addClause($(this).text());
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
