import {CLAUSES, CLAUSES_TYPES} from './const';
import {inputElement} from './element_builder';
import {Store} from './store';

const query_builder_container = $(
    `<div id="sqlqb-container"></div>`),
    query_builder_input_container = $(`<div id="sqlqb-input-container"></div> `),
    query_builder_input = $(`<ul id="sqlqb-input" class=""></ul>`), // container for building sql queries, all tags will be placed here
    query_builder_tags_container = $(`<div id="sqlqb-tags-container"></div>`),
    query_builder_tags_clauses = $(`<div id="sqlqb-tags-clauses"><h4 class="sqldb-header">Clauses</h4></div>`),
    query_builder_tags_operators = $(`<div id="sqlqb-tags-operators"><h4 class="sqldb-header">Operators</h4></div>`),
    query_builder_output_container = $(
        `<div id="sqlqb-output-container">
            <i id="sqlqb-copy-icon" class="far fa-copy fa-lg sqlqb-icon sqlqb-icon-copy"></i>
            <div id="sqlqb-output"></div>
        </div>`);

query_builder_input_container.append(query_builder_input);
query_builder_container.append(query_builder_input_container);

for (let i in CLAUSES) {
    let tag = CLAUSES[i];
    switch (tag.type) {
        case CLAUSES_TYPES.VALUE:
            appendClauseValueElement(tag.name, i);
            break;
        case CLAUSES_TYPES.ClAUSE:
            appendClauseElement(tag.name, i);
            break;
        case CLAUSES_TYPES.OPERATOR:
            appendOperatorTag(tag.name, i);
            break;
    }
}

query_builder_tags_container.append(query_builder_tags_clauses);
query_builder_tags_container.append(query_builder_tags_operators);

query_builder_container.append(query_builder_tags_container);
query_builder_container.append(query_builder_output_container);

function appendClauseValueElement(name, id) {
    const clause = $(`<span data-clause-id="${id}" class="sqlqb-tag sqlqb-tag-value">${name}</span>`);
    clause.click(() => {
        query_builder_input.append(inputElement(id));
        commitChanges();
    });
    query_builder_tags_clauses.append(clause);
}

function appendClauseElement(name, id) {
    name = name.toUpperCase();
    const clause = $(`<span data-clause-id="${id}" class="sqlqb-tag sqlqb-tag-clause">${name}</span>`);
    clause.click(() => {
        query_builder_input.append(inputElement(id));
        commitChanges();
    });
    query_builder_tags_clauses.append(clause);
}

function appendOperatorTag(name, id) {
    name = name.toUpperCase();
    const clause = $(`<span data-clause-id="${id}" class="sqlqb-tag sqlqb-tag-operator">${name}</span>`);
    clause.click(() => {
        query_builder_input.append(inputElement(id));
        commitChanges();
    });
    query_builder_tags_operators.append(clause);
}

function commitChanges() {
    Store.commit();
}

function initDragAndDrop() {

    // init jquery-ui sortable
    $(query_builder_input).sortable({
        revert: true,
        start: (event, ui) => {
            $(ui.helper[0]).css({'opacity': '0.5'});
        },
        stop: (event, ui) => {
            $(ui.item).css({'opacity': '1'});
            //updateOutput();
        },
        tolerance: "intersect",
        containment: "parent",
        forceHelperSize: true,
        forcePlaceholderSize: true,
        placeholder: 'sort-placeholder',
        delay: 150,
        update: function (event, ui) {
            setTimeout(commitChanges(), 100);
        }
    });

    $(query_builder_input).disableSelection();

    // init jquery-ui draggable, all item are draggable
    $('#sqlqb-tags-container span').draggable({
        connectToSortable: '#sqlqb-input',
        helper: 'clone',
        revert: 'invalid',
        revertDuration: 300,
        delay: 150,
        start: (event, ui) => {
            //console.log($(ui.helper[0]));
            $(ui.helper[0]).css({'opacity': '0.5'});
        },
        // creates new element on drop
        stop: (event, ui) => {

            let current_elem = $(ui.helper[0]); //clone of dragged element

            let tag_id = current_elem.attr('data-clause-id');

            //if prev is <li>, elements was dropped in input container, that means a new element must be added
            if (current_elem.parent().is('#sqlqb-input')) {
                let new_elem = inputElement(tag_id);
                //for now setTimeout is needed, otherwise .prev() get undefined and the new element will be placed on wrong position
                setTimeout(() => {
                    //FIXME: cant add element on the start if elements.length > 0
                    if (current_elem.prev().length !== 0) {
                        new_elem.insertAfter(current_elem.prev()); //insert new element on right position
                    } else {
                        query_builder_input.append(new_elem);
                    }
                    current_elem.remove(); // remove clone of dragged element
                    //updateOutput();// and update output
                }, 600)
            }
        }
    });
    $('#sqlqb-tags-container').disableSelection();
}

export function init(
    {container, initElements} = {
        container: null,
        initElements: [{id: 1, text: ''}, {id: 0, text: 'first_name'}, {id: 2, text: ''}, {id: 0, text: 'users'}]
    }
) {
    if (container &&  container !== '') {
        $(container).append(query_builder_container);
        initDragAndDrop();//Make Elements interactive

        initElements.forEach((item) => {
            query_builder_input.append(inputElement(item.id, item.text));
        });
        commitChanges();
    } else {
        console.error('%cContainer for SQL Query Builder is required!. Please provide an container element on initialization (e.g. "#container" or ".container")', 'background-color:#ff5f69; color:white; padding:5px; font-size: 14px;');
    }
}
