import 'bootstrap';
import 'popper.js';
import 'jquery-ui-bundle';
//import '@fortawesome/fontawesome-free/js/all.js';
//import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

$(document).ready(() => {
    let clauses = $('#sql_pool_container span.clause, #sql_pool_container span.operator'); //get clauses tags from pool
    let clause_value = $('#sql_pool_container .value_tag');  // get clause value input fields
    let input_container = $('#sql_input'); // container for building sql queries, all tag will be placed here
    let current_clause_tag_placeholder; // placeholder between clause tags (plus button)
    let overlay = $('.sql_pool_overlay'); // modal with clauses

    /**
     * Adds a plus button between clauses in @input_container, that allows adding clauses between clauses on click
     * @param container - current <li> element in the sortable list of clauses
     */
    const addPlaceholder = (container) => {
        let placeholder_button = $('<a title="add new tag" class="controls_add_button controls clause_tag clause controls_hide"><i>+</i></a>'); //template

        $(container).append(placeholder_button); //append template to the current <li>

        container.mouseover(()=> {
            placeholder_button.toggleClass('controls_hide');
        });
        container.mouseout(()=> {
            placeholder_button.toggleClass('controls_hide');
        });

        //on click displays a modal with clauses
        $(placeholder_button).click(() => {
            let overlay_position = input_container.offset(); // place modal under input container
            current_clause_tag_placeholder = container; // save <li> globally, is needed to find position where new tag must be placed
            overlay.css({'top': overlay_position.top + input_container.outerHeight()});// place modal under input container
            overlay.fadeIn(300); // show modal
        });
    };

    /**
     * Defines click event for all clauses in modal, that adds a tag/input by clicking placeholder button between clauses
     */
    $('.sql_pool_overlay span.clause, .sql_pool_overlay span.operator').each(function () {
        $(this).click(function () {
            let clause_tag = buildClauseTagElement($(this).text(), this); //builds new tag
            clause_tag.addClass('disp-none pulse');
            clause_tag.insertAfter(current_clause_tag_placeholder); //inserts new tag to the DOM
            addPlaceholder(current_clause_tag_placeholder.next()); // adds placeholder button
            clause_tag.fadeIn(1000);
            overlay.fadeOut(300, () => overlay.offset({top: 0, left: 0}));//fade out and reset position of overlay
            updateOutput(); // update SQL query output
        });
    });
    $('.sql_pool_overlay .icon_close_overlay').click( () => {
        $('.sql_pool_overlay').fadeOut(300);
    });

    $('.sql_pool_overlay .value_tag').click(() => {
        let clause_value_input = buildClauseValueInputElement();
        clause_value_input.insertAfter(current_clause_tag_placeholder);
        addPlaceholder(clause_value_input);
        overlay.fadeOut(300, () => overlay.offset({top: 0, left: 0}));//fade out and reset position of overlay
        updateOutput();
    });

    /**
     * Adds new clause value input to the input container
     * @param value - optional value, that can be displayed in input
     * @param elem -
     */
    const addClauseValueInput = (value, elem) => {
        let clause_value_input = buildClauseValueInputElement(value, elem);

        input_container.append(clause_value_input);
        console.warn(clause_value_input);
        addPlaceholder(clause_value_input);
        updateOutput();
    };

    const buildClauseValueInputElement = (value = '') => {
        const clause_value_input =
            $(`<input data-type="clause-value" type="text" class="value_input value_input_selected" placeholder="Enter value" value="${value ? value : ''}">`);
        const remove_clause_icon = $(`<span class="controls_remove_button controls controls_hide clause_tag">&times;</span>`);
        const value_tag = $(`<span class="value_tag_selected clause_tag">${value ? value : 'Enter value'}</span>`);
        const li_item = $(`<li class="sortable_clauses pulse"></li>`);

        li_item.append(remove_clause_icon);
        li_item.append(value_tag);
        li_item.append(clause_value_input);

        li_item.mouseover(()=> {
            toggleElementClasses([remove_clause_icon, value_tag], ['controls_hide', 'value_tag_selected_highlight']);
            li_item.css({'z-index': '1000'});
        });
        li_item.mouseout(()=> {
            toggleElementClasses([remove_clause_icon, value_tag], ['controls_hide', 'value_tag_selected_highlight']);
            li_item.css({'z-index': 'initial'});
        });

        toggleValueInput(clause_value_input, value_tag);

        remove_clause_icon.click(() => {
            li_item.fadeOut(300, () => {
                li_item.remove();
                updateOutput();
            });
        });

        clause_value_input.focus();
        clause_value_input.blur(() => {
            updateOutput();
        });
        clause_value_input.keypress(() => {
            //setTimeout(100, updateOutput());
            updateOutput();
        });
        return li_item;
    };

    const toggleValueInput = (input, span) => {

        span.dblclick(() => {
            span.css({'visibility': 'hidden'});
            input.fadeToggle().toggleClass('on-top')/*.val(span.text())*/;
            input.focus();
        });

        input.blur(() => {

            if (!input.val() || input.val() === '') {
                return;
            }
            span.text(input.val());
            span.css({'visibility': 'visible'});
            input.fadeToggle().toggleClass('on-top');
            updateOutput();
        });

        if (span.text() === 'Enter value') {
            span.css({'visibility': 'hidden'});
            input.css({'display': 'inline'});
            input.focus();
        }

    };

    const addClause = (text, elem) => {
        let clause_tag = buildClauseTagElement(text, elem);
        input_container.append(clause_tag);
        addPlaceholder(clause_tag);
        updateOutput();
    };

    const buildClauseTagElement = (text, elem) => {
        const clause_li_item = $(`<li class="sortable_clauses pulse"></li>`);
        const clause_tag = $(`<span data-type="${$(elem).attr('data-type')}" class="clause_tag clause_tag_selected">${text}</span>`);
        const remove_clause_icon = $(`<span class="controls_remove_button controls controls_hide clause_tag">&times;</span>`);

        clause_li_item.append(clause_tag);
        clause_li_item.append(remove_clause_icon);

        if ($(elem).is('.operator')) {
            remove_clause_icon.addClass('operator_selected');
            clause_tag.addClass('operator_selected');
            clause_li_item.mouseover(()=> {
                clause_tag.addClass('operator_selected_highlight');
                remove_clause_icon.toggleClass('controls_hide');
                clause_li_item.css({'z-index': '1000'});
            });
            clause_li_item.mouseout(()=> {
                clause_tag.removeClass('operator_selected_highlight');
                remove_clause_icon.toggleClass('controls_hide');
                clause_li_item.css({'z-index': 'initial'});
            });
        } else {
            clause_li_item.mouseover(()=> {
                clause_tag.addClass('clause_tag_selected_highlight');
                remove_clause_icon.toggleClass('controls_hide');
                clause_li_item.css({'z-index': '1000'});
            });
            clause_li_item.mouseout(()=> {
                clause_tag.removeClass('clause_tag_selected_highlight');
                remove_clause_icon.toggleClass('controls_hide');
                clause_li_item.css({'z-index': 'initial'});
            });
        }

        $(remove_clause_icon).click(() => {
            $(clause_li_item).fadeOut(300, () => {
                clause_li_item.remove();
                updateOutput();
            });
        });
        return clause_li_item;
    };

    /**
     * This method biuld SQL query string and show it in output container, calls avery time if user make some changes in
     * input
     */
    const updateOutput = () => {
        let output_container = $('#sql_query_output');
        output_container.empty(); //clear container

        //TODO: change that for DIVA
        let query_items = $('li [data-type]'); //get all clauses, added by user

        query_items.each((i, item) => {

            let elem = $('<span></span>');// clause or value that must be highlighted will be stored in <span>

            if ($(item).is('input')) {
                console.log($(item).val());
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
        output_container.append('<span class="output_clause">;</span>'); // close query with ;
    };

    //Add initial Clauses
    addClause('SELECT', clauses[0]);
    addClauseValueInput('first_name', clause_value[0]);
    addClauseValueInput('last_name', clause_value[0]);
    addClause('FROM', clauses[1]);
    addClauseValueInput('users', clause_value[0]);
    addClause('WHERE', clauses[2]);

    // set initial onclick event for the value input in clauses pool, on click input will be added to the input container
    clause_value.click(() => {
        addClauseValueInput();
    });

    // set initial onclick event for each clause tag in clauses pool, on click tag will be added to the input container
    $(clauses).each(function () {
        $(this).click(function () {
            addClause($(this).text(), this);
        });
    });

    // init jquery-ui sortable
    $(input_container).sortable({
        revert: true,
        start: ( event, ui ) => {
            console.log($(ui.helper[0]));
            $(ui.helper[0]).css({'opacity': '0.5'});
        },
        stop: (event, ui) => {
            $(ui.item).css({'opacity': '1'});
            updateOutput();
        },
        tolerance: "intersect",
        containment: "parent",
        forceHelperSize: true,
        forcePlaceholderSize: true,
        placeholder: 'sort-placeholder',
        delay: 150,
    });

    // init jquery-ui draggable, all item are draggable
    $(clauses).draggable({
        connectToSortable: '#sql_input',
        helper: 'clone',
        revert: 'invalid',
        revertDuration: 300,
        delay: 150,
        start: ( event, ui ) => {
            console.log($(ui.helper[0]));
            $(ui.helper[0]).css({'opacity': '0.5'});
        },
        // creates new element on drop
        stop: (event, ui) => {

            let current_elem = $(ui.helper[0]); //clone of dragged element

            //if prev is <li>, elements was dropped in input container, that means an new element must be added
            if (current_elem.parent().is('#sql_input')) {
                let new_elem;
                if (current_elem.is('span')) {
                    new_elem = buildClauseTagElement(current_elem.text(), current_elem); // add new clause tag
                } else {
                    new_elem = buildClauseValueInputElement('', current_elem); // else add new value input
                }
                //for now setTimeout is needed, otherwise .prev() get undefined and the new element will be placed on wrong position
                setTimeout(() => {
                    new_elem.insertAfter(current_elem.prev()); //insert new element on right position
                    current_elem.remove(); // remove clone of dragged element
                    addPlaceholder(new_elem); // add placeholder button
                    updateOutput();// and update output
                },600)
            }
        }
    });
    $('ul, li').disableSelection();

    /**
     * copy SQL query output to the clipboard
     */
    $('.icon_close_overlay').click(() => {
        let copied_text = '';

        $('#sql_query_output span').each((i, item) => {
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

    const toggleElementClasses = (elems, toggle_classes) => {
        $(elems).each((i, elem) => {
           elem.toggleClass(toggle_classes[i]);
        });
    };

    //SELECT 1,2 FROM users WHERE id <= 5 AND age >= 25 AND (name = 'some_name' OR name = ''another_name)
    let query = {
        select:
            {
                values: ['1', '2']
            }
        ,
        from: 'users',
        where:
            [
                {
                    condition:{
                        value1: 'id',
                        operator: 'eql',
                        value2: '5'
                    }
                },
                {
                    and: [{
                        condition: {
                            val1: '',
                            val2: '',
                            operator: 'eq'
                        }
                    }, {clause: ''}]
                },
                {
                    and: [
                        {
                        condition:
                            {
                            val1: '',
                            val2: '',
                            operator: 'eq'
                            }
                        },
                        {
                            condition: {
                                val1: '',
                                val2: '',
                                operator: 'eq'
                            }
                        },
                    {clause: 'or'}
                    ]
                }
            ]
    }

/*let query = {
    select:
        {
            values: ['1', '2']
        }
    ,
    from: 'users',
    where:
        [
            {
                condition:{
                    value1: 'id',
                    operator: 'eql',
                    value2: '5'
                }
            },
            {
                and: {
                    value1: 'age',
                    operator: 'eqg',
                    value2: '25',
                    clause:{}

                }
            },
            {
                and: {
                    value1: '',
                    operator: '',
                    value2: '',
                    clause:{
                        or: {
                            value1: 'name',
                            operator: 'eq',
                            value2: 'v2',
                            clause:{}

                        }
                    }
                }
            }
        ]
}*/

    console.log(query.where[0].and);
});

