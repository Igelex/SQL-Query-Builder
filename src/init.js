import {tags} from './tags';
import {inputClauseElement, inputClauseValueElement} from './input';
import {Store} from './store';

const query_builder_container = $(
    `<div id="query-builder-container">
               
    </div>`),
    query_builder_input_container = $(`<div id="query-builder-input-container"></div> `),
    query_builder_input = $(`<ul id="query-builder-input" class=""></ul>`), // container for building sql queries, all tags will be placed here
    query_builder_tags_container = $(`<div id="query-builder-tags-container"></div>`),
    query_builder_tags_clauses = $(`<div id="query-builder-tags-clauses"><h4 class="mb-4">Clauses</h4></div>`),
    query_builder_tags_operators = $(`<div id="query-builder-tags-operators"><h4 class="mb-4">Operators</h4></div>`),
    query_builder_output_container = $(
        `<div id="query-builder-output-container">
            <div class="alert alert-secondary">
                <i id="query-builder-copy-icon" class="far fa-copy fa-lg icon-close-overlay"></i>
                <div id="query-builder-output">OUTPUT</div>
            </div>
        </div>`);

query_builder_input_container.append(query_builder_input);
query_builder_container.append(query_builder_input_container);

for (let i in tags) {
    let tag = tags[i];
    switch (tag.type) {
        case 'value':
            appendClauseValueElement(tag.name, i);
            break;
        case 'clause':
            appendClauseElement(tag.name, i);
            break;
        case 'operator':
            appendOperatorTag(tag.name, i);
            break;
    }
}

query_builder_tags_container.append(query_builder_tags_clauses);
query_builder_tags_container.append(query_builder_tags_operators);

query_builder_container.append(query_builder_tags_container);
query_builder_container.append(query_builder_output_container);

initDragAndDrop();//Make Elements interactive

//Add initial Clauses
/*inputClauseTag(1);
inputValueTag('first_name');
inputValueTag('last_name');
inputClauseTag(2);
inputValueTag('users');
inputClauseTag(3);*/


function appendClauseValueElement(name, id) {
    const clause = $(`<span data-clause-id="${id}" class="value-tag clause-tag">${name}</span>`);
    clause.click(() => {
        console.warn(id);
        query_builder_input.append(inputClauseValueElement(id));
    });
    query_builder_tags_clauses.append(clause);
}

function appendClauseElement(name, id) {
    name = name.toUpperCase();
    const clause = $(`<span data-clause-id="${id}" class="clause-tag clause">${name}</span>`);
    clause.click(() => {
        query_builder_input.append(inputClauseElement(id));
    });
    query_builder_tags_clauses.append(clause);
}

function appendOperatorTag(name, id) {
    name = name.toUpperCase();
    const clause = $(`<span data-clause-id="${id}" class="clause-tag operator">${name}</span>`);
    clause.click(() => {
        query_builder_input.append(inputClauseElement(id));
    });
    query_builder_tags_operators.append(clause);
}

export function init(container = null) {
    if (container) {
        $(container).append(query_builder_container);
        initDragAndDrop();
    } else {
        console.error('Container for SQL Query Builder is required!. Please provide an container element on initialization (e.g. "#container" or ".container")');
    }
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
            setTimeout(() => {
                let elements = [...$(this).children()].map((elem) => ({
                    id: $(elem).attr('data-clause-id'),
                    payload: $(elem).text()
                }));
                Store.setElements(elements);
            }, 100);
        }
    });

    $(query_builder_input).disableSelection();

    // init jquery-ui draggable, all item are draggable
    $('#query-builder-tags-container span').draggable({
        connectToSortable: '#query-builder-input',
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
            if (current_elem.parent().is('#query-builder-input')) {
                let new_elem;
                if (tags[tag_id].type !== 'value') {
                    new_elem = inputClauseElement(tag_id); // add new clause tag
                } else {
                    new_elem = inputClauseValueElement(tag_id); // else add new value input
                }
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
    $('#query-builder-tags-container').disableSelection();
}