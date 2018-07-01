import 'bootstrap';
import 'popper.js';
import 'jquery-ui-bundle';
//import '@fortawesome/fontawesome-free/js/all.js';
//import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

$(document).ready(() => {
    let clauses = $('#sql_pool_container span.clause_tag');
    let clause_value = $('#sql_pool_container .clause_value');
    let input_container = $('#sql_input');
    let current_clause_tag_placeholder;
    let overlay = $('.sql_pool_overlay');

    const addPlaceholder = (container) => {
        let placeholder = $('<a data-toggle="tooltip" title="hello" class="clause_placeholder"><i>+</i></a>');
        $(container).append(placeholder);

        placeholder.mouseover(() => {
            $(placeholder).find('i').css({'visibility': 'visible'});
        });
        placeholder.mouseout(() => {
            $(placeholder).find('i').css({'visibility': 'hidden'});
        });
        $(placeholder).click(() => {
            let overlay_position = input_container.offset();
            current_clause_tag_placeholder = placeholder.parent();
            overlay.css({'top': overlay_position.top + input_container.outerHeight()});//set position of overlay
            overlay.fadeIn(300);
        });
    };

    $('.sql_pool_overlay span.clause_tag').each(function () {
        $(this).click(function () {
            let clause_tag = buildClauseTagElement($(this).text(), this);
            clause_tag.insertAfter(current_clause_tag_placeholder);
            addPlaceholder(current_clause_tag_placeholder.next());
            overlay.fadeOut(300, () => overlay.offset({top: 0, left: 0}));//fade out and reset position of overlay
            updateOutput();
        });
    });
    $('.sql_pool_overlay .clause_value').click(() => {
        let clause_value_input = buildClauseValueInputElement($(this).text(), this);
        clause_value_input.insertAfter(current_clause_tag_placeholder);
        addPlaceholder(current_clause_tag_placeholder.next());
        overlay.fadeOut(300, () => overlay.offset({top: 0, left: 0}));//fade out and reset position of overlay
        updateOutput();
    });

    const addClauseValueInput = (value = "", elem) => {
        let clause_value_input = buildClauseValueInputElement(value, elem);

        input_container.append(clause_value_input);
        addPlaceholder(clause_value_input);
        updateOutput();
    };

    const buildClauseValueInputElement = (value = "", elem) => {
        const clause_value_container =
            $(`<div class="clause_value_container">
                <input data-type="${$(elem).attr('data-type')}" type="text" class="value_input clause_tag_selected" placeholder="Enter value" value="${value}">
              </div>`);
        const remove_clause_icon = $(`<span class="remove_clause">&times;</span>`);
        const li_item = $(`<li class="sortable_clauses"></li>`);

        clause_value_container.append(remove_clause_icon);
        li_item.append(clause_value_container);

        remove_clause_icon.dblclick(() => {
            li_item.fadeOut(300, () => {
                li_item.remove();
                updateOutput();
            });
        });

        let value_input = li_item.find('.value_input');
        value_input.focus();
        value_input.blur(() => {
            updateOutput();
        });
        value_input.keypress(() => {
            //setTimeout(100, updateOutput());
            updateOutput();
        });
        return li_item;
    };

    const addClause = (text, elem) => {
        let clause_tag = buildClauseTagElement(text, elem);
        input_container.append(clause_tag);
        addPlaceholder(clause_tag);
        updateOutput();
    };

    const buildClauseTagElement = (text, elem) => {
        const clause_li_item = $(`<li class="sortable_clauses"></li>`);
        const clause_tag = $(`<span data-type="${$(elem).attr('data-type')}" class="clause_tag clause_tag_selected">${text}</span>`);
        const remove_clause_icon = $(`<span class="remove_clause clause_tag">&times;</span>`);
        if ($(elem).is('.operator')) {
            remove_clause_icon.addClass('operator');
            clause_tag.addClass('operator');
        }
        $(remove_clause_icon).click(() => {
            $(clause_li_item).fadeOut(300, () => {
                clause_li_item.remove();
                updateOutput();
            });
        });
        clause_li_item.append(clause_tag);
        clause_li_item.append(remove_clause_icon);
        return clause_li_item;
    };

    const updateOutput = () => {
        let output_container = $('#sql_query_output');
        output_container.empty();

        let query_items = $('li [data-type]');

        query_items.each((i, item) => {

            let elem = $('<span></span>');// clause or value, that must be highlighted

            if ($(item).is('input')) {
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
            if ($(item).is('[data-type$="block"]') && i > 0) {
                elem.before('<br>');
            }
        });
        output_container.append('<span class="output_clause">;</span>')
    };

    //Add initial Clauses
    addClause('SELECT', clauses[0]);
    addClauseValueInput('first_name', clause_value[0]);
    addClauseValueInput('last_name', clause_value[0]);
    addClause('FROM', clauses[1]);
    addClauseValueInput('users', clause_value[0]);
    addClause('WHERE', clauses[2]);

    clause_value.click(() => {
        addClauseValueInput();
    });

    $(clauses).each(function () {
        $(this).click(function () {
            addClause($(this).text(), this);
        });
    });

    $(input_container).sortable({
        revert: true,
        stop: () => {
            updateOutput()
        },
        tolerance: "intersect",
        containment: "parent",
        forceHelperSize: true,
        forcePlaceholderSize: true,
        placeholder: 'sort-placeholder'
    });
    $(clauses).draggable({
        connectToSortable: '#sql_input',
        helper: 'clone',
        revert: 'invalid',
        revertDuration: 300,
        stop: (event, ui) => {

            let current_elem = $(ui.helper[0]);

            if (current_elem.prev().is('li')) {
                let new_elem;
                if (current_elem.is('span')) {
                    new_elem = buildClauseTagElement(current_elem.text(), current_elem);
                } else {
                    new_elem = buildClauseValueInputElement('', current_elem);
                }
                setTimeout(() => {
                    new_elem.insertAfter(current_elem.prev());
                    current_elem.remove();
                    addPlaceholder(new_elem);
                    updateOutput();
                },600)
            }
        }
    });
    $('ul, li').disableSelection();

    $('.icon').click(() => {
        let copied_text = '';

        $('#sql_query_output span').each((i, item) => {
            copied_text += `${item.textContent.trim()} `;
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
});