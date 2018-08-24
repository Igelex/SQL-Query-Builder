import {CLAUSES, CLAUSES_TYPES} from './const';
import {inputElement} from './element_builder';
import {Store} from './store';

const sqlqb_container = $(`<div id="sqlqb-container"></div>`),
    sqlqb_input_container = $(`<div id="sqlqb-input-container"></div>`),
    sqlqb_input = $(`<ul id="sqlqb-input" class=""></ul>`), //container for building sql queries, all selected tags will be placed here
    sqlqb_tags_container = $(`<div id="sqlqb-tags-container"></div>`),
    sqlqb_tags_clauses = $(`<div id="sqlqb-tags-clauses" class="sqlqb-tags-group"><h4 class="sqlqb-header">Clauses</h4></div>`),
    sqlqb_tags_operators = $(`<div id="sqlqb-tags-operators" class="sqlqb-tags-group"><h4 class="sqlqb-header">Operators</h4></div>`),

    sqlqb_tags_TEST = $(`<div id="sqlqb-tags-TEST" class="sqlqb-tags-group"><h4 class="sqlqb-header">TEST</h4></div>`),
    sqlqb_tags_TEST1 = $(`<div id="sqlqb-tags-TEST1" class="sqlqb-tags-group"><h4 class="sqlqb-header">TEST</h4></div>`),

    sqlqb_output_container = $(
        `<div id="sqlqb-output-container">
            <span class="sqlqb-badge">copy</span>
            <div id="sqlqb-output"></div>
        </div>`);

[sqlqb_tags_clauses, sqlqb_tags_operators].forEach((container) => {
    console.log(container.find('h4'));
    container.find('h4').click(() => {
        console.log(container[0].style.height);
        if (container[0].style.height === '52px' || container[0].style.height === ''){
            container[0].style.height = container[0].scrollHeight + "px" ;
        } else {
            container[0].style.height = 52 + 'px';
        }
    })
});

sqlqb_input_container.append(sqlqb_input);

//append clauses tags
for (let i in CLAUSES) {
    appendInitialElements(CLAUSES[i], i);
}
sqlqb_tags_container.append(wrapWithRow([sqlqb_tags_clauses,sqlqb_tags_operators, sqlqb_tags_TEST,sqlqb_tags_TEST1]));

//inject all to main container
sqlqb_container.append(wrapWithRow([sqlqb_input_container])); //input block
sqlqb_container.append(sqlqb_tags_container); //block with all available tags
sqlqb_container.append(wrapWithRow([sqlqb_output_container])); //output block

function appendInitialElements(element, id) {
    const type = element.type;
    const clause = $(`<span data-clause-id="${id}" class="sqlqb-tag sqlqb-tag-${type}">${type !== CLAUSES_TYPES.VALUE ? element.name.toUpperCase() : element.name}</span>`);
    clause.click(() => {
        sqlqb_input.append(inputElement(id));
        commitChanges();
    });

    switch (element.type) {
        case CLAUSES_TYPES.VALUE:
            sqlqb_tags_clauses.append(clause);
            //sqlqb_tags_TEST1.append(clause);
            break;
        case CLAUSES_TYPES.CLAUSE:
            sqlqb_tags_clauses.append(clause);
            //sqlqb_tags_TEST1.append(clause);
            break;
        case CLAUSES_TYPES.OPERATOR:
            sqlqb_tags_operators.append(clause);
            //sqlqb_tags_TEST.append(clause);
            break;
    }
}

function commitChanges() {
    Store.commit();
}

function initDragAndDrop() {

    // init jquery-ui sortable
    $(sqlqb_input).sortable({
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
        update: function () {
            setTimeout(commitChanges(), 100);
        }
    });

    $(sqlqb_input).disableSelection();

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
                        sqlqb_input.append(new_elem);
                    }
                    current_elem.remove(); // remove clone of dragged element
                    //updateOutput();// and update output
                }, 600)
            }
        }
    });
    $('#sqlqb-tags-container').disableSelection();
}

function wrapWithRow(elem = []) {
    const row = $(`<div class="sqlqb-row"></div>`);
    for (let el in elem) {
        row.append(wrapWithCol(elem[el]));
    }
    return row;
}

function wrapWithCol(elem) {
    const col = $(`<div class="sqlqb-col"></div>`);
    return col.append(elem);
}

export function init(
    {container, initElements} = {
        container: null,
        initElements: [{id: 1, text: ''}, {id: 0, text: 'first_name'}, {id: 2, text: ''}, {id: 0, text: 'users'}]
    }
) {
    if (container && container !== '') {
        $(container).append(sqlqb_container); //inject sqlqb into provided container
        initDragAndDrop();//Make Elements interactive

        initElements.forEach((item) => {
            sqlqb_input.append(inputElement(item.id, item.text));
        });
        commitChanges();
    } else {
        console.error('%cContainer for SQL Query Builder is required!. Please provide an container element on initialization (e.g. "#container" or ".container")', 'background-color:#ff5f69; color:white; padding:5px; font-size: 14px;');
    }
}
