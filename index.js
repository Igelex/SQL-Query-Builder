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

    clause_value.click(() =>{

        const clause_value_template =
            `<div class="clause_value_container clause_selected">
                <input type="text" class="value_input" placeholder="Enter value">
            </div>`;
        const remove_clause_template = `<span class="remove_clause">&times;</span>`;
        const li_template = `<li></li>`;

        let new_clause_value = $(clause_value_template).append(remove_clause_template);

        $(remove_clause_template).click(() => {
            $(li_template).remove();
        });
        input.append($(li_template).append(new_clause_value));
    });

    $(clauses).each(function () {
        $(this).click(function () {
            const clause_tag = $(`<li><span class="clause_tag clause_selected">${$(this).text()}</span></li>`);

            $(clause_tag).click(function() {
                clause_tag.remove();
            });
            input.append($(clause_tag));
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
    $( "ul, li" ).disableSelection();
});