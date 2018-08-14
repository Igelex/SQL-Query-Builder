import {tags} from './tags';
import {inputClauseElement, inputClauseValueElement} from './input';

const query_builder_container = $(
    `<div id="query-builder-container">
               
    </div>`),
    query_builder_input_container = $(`<div id="query-builder-input-container"></div> `),
    query_builder_input = $(`<ul id="query-builder-input" class=""></ul>`),
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

let input_container = $('#query-builder-input'); // container for building sql queries, all tags will be placed here

initDragAndDrop();//Make Elements interactive

//Add initial Clauses
/*inputClauseTag(1);
inputValueTag('first_name');
inputValueTag('last_name');
inputClauseTag(2);
inputValueTag('users');
inputClauseTag(3);*/


function appendClauseValueElement(name, index) {
    const clause = $(`<span data-clause-id="${index}" class="value-tag clause-tag">${name}</span>`);
    clause.click(() => {
        console.warn(index);
        query_builder_input.append(inputClauseValueElement());
    });
    query_builder_tags_clauses.append(clause);
}

function appendClauseElement(name, index) {
    name = name.toUpperCase();
    const clause = $(`<span data-clause-id="${index}" class="clause-tag clause">${name}</span>`);
    clause.click(() => {
        console.warn(input_container);
        query_builder_input.append(inputClauseElement(index));

    });
    query_builder_tags_clauses.append(clause);
}

function appendOperatorTag(name, index) {
    name = name.toUpperCase();
    const clause = $(`<span data-clause-id="${index}" class="clause-tag operator">${name}</span>`);
    clause.click(() => {
        console.warn(index);
        inputClauseElement(index);
    });
    query_builder_tags_operators.append(clause);
}

export async function init(container = null) {
    if (container) {
        await $(container).append(query_builder_container);
    } else {

    }
}

function initElements() {

}

function initDragAndDrop() {

    // init jquery-ui sortable
    $('#query-builder-input-container').sortable({
        revert: true,
        start: (event, ui) => {
            console.log($(ui.helper[0]));
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
    });

    $('#query-builder-input-container').disableSelection();

    // init jquery-ui draggable, all item are draggable
    $('#query-builder-tags-container span').draggable({
        connectToSortable: '#query-builder-input',
        helper: 'clone',
        revert: 'invalid',
        revertDuration: 300,
        delay: 150,
        start: (event, ui) => {
            console.log($(ui.helper[0]));
            $(ui.helper[0]).css({'opacity': '0.5'});
        },
        // creates new element on drop
        stop: (event, ui) => {

            let current_elem = $(ui.helper[0]); //clone of dragged element

            //if prev is <li>, elements was dropped in input container, that means a new element must be added
            if (current_elem.parent().is('#query-builder-input')) {
                let new_elem;
                if (current_elem.is('span.clause-tag')) {
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
                }, 600)
            }
        }
    });
    $('#query-builder-tags-container').disableSelection();
}