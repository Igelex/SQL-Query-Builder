import {CLAUSES, CLAUSES_TYPES} from './const';
import {inputElement, buildTag} from './element_builder';
import store from './store/store.js';
import floating_input from './floating_input';
import { Sortable } from '@shopify/draggable';

const sqlqb_container = $(`<div id="sqlqb-container"></div>`),
    sqlqb_input_container = $(`<div id="sqlqb-input-container"></div>`),
    sqlqb_input = $(`<ul id="sqlqb-input" class=""></ul>`), //container for building sql queries, all selected tags will be placed here
    sqlqb_tags_container = $(`<div id="sqlqb-tags-container"></div>`),
    sqlqb_tags_clauses = $(`<div id="sqlqb-tags-clauses" class="sqlqb-tags-group"><h4 class="sqlqb-header sqlqb-collapsed">Clauses <span class="sqlqb-collapsed">+</span></h4></div>`),
    sqlqb_tags_operators = $(`<div id="sqlqb-tags-operators" class="sqlqb-tags-group"><h4 class="sqlqb-header sqlqb-collapsed">Operators<span class="sqlqb-collapsed">+</span></h4></div>`),

    sqlqb_tags_TEST = $(`<div id="sqlqb-tags-TEST" class="sqlqb-tags-group"><h4 class="sqlqb-header">TEST<span>+</span></h4></div>`),
    sqlqb_tags_TEST1 = $(`<div id="sqlqb-tags-TEST1" class="sqlqb-tags-group"><h4 class="sqlqb-header">TEST<span>+</span></h4></div>`),

    sqlqb_output_container = $(
        `<div id="sqlqb-output-container">
            <span class="sqlqb-badge">copy</span>
            <div id="sqlqb-output"></div>
        </div>`);

[sqlqb_tags_clauses, sqlqb_tags_operators].forEach((container) => {
    container.find('h4').click(function(){
        if (container[0].style.height === '52px' || container[0].style.height === ''){
            container[0].style.height = 100 + '%'; //container[0].scrollHeight + "px" ;
        } else {
            container[0].style.height = 52 + 'px';
        }
        $(this).find('span').toggleClass('sqlqb-collapsed');
        $(this).toggleClass('sqlqb-collapsed');
    });
});

sqlqb_input_container.append(sqlqb_input);

//append clauses tags
for (let i in CLAUSES) {
    appendInitialElements(CLAUSES[i], i);
}
sqlqb_tags_container.append(wrapWithRow([sqlqb_tags_clauses, sqlqb_tags_operators, sqlqb_tags_TEST,sqlqb_tags_TEST1]));

//inject all to main container
sqlqb_container.append(wrapWithRow([sqlqb_input_container])); //input block
sqlqb_container.append(sqlqb_tags_container); //block with all available tags
sqlqb_container.append(wrapWithRow([sqlqb_output_container])); //output block

function appendInitialElements(element, id) {
    const clause = buildTag(element, id);
    clause.click(() => {
        sqlqb_input.append(inputElement(id));
        commitChanges();
    });

    switch (element.type) {
        case CLAUSES_TYPES.VALUE:
            sqlqb_tags_clauses.append(clause);
            break;
        case CLAUSES_TYPES.CLAUSE:
            sqlqb_tags_clauses.append(clause);
            break;
        case CLAUSES_TYPES.OPERATOR:
            sqlqb_tags_operators.append(clause);
            break;
    }
}

function commitChanges() {
    store.dispatch('setInput');
}

function initSortable() {

    const sortable_input = document.querySelectorAll('#sqlqb-input');

    const sortable = new Sortable(sortable_input, {
        draggable: 'li'/*.sqlqb-tags-group span'*/
    });
    sortable.on('sortable:stop', () => commitChanges());
    sortable.on('sortable:start', (event) => event.data.dragEvent.mirror.classList.remove('sqlqb-animation-pulse'));
}

/*Not used yet*/
/*function initDraggable() {

    const draggable_container = document.querySelectorAll('.sqlqb-tags-group');

    console.warn(draggable_container);

    const draggable = new Sortable(document.querySelectorAll('.sqlqb-tags-group'), {
        draggable: 'span'
    });

    draggable.on('drag:start', () => console.log('drag:start'));
    draggable.on('drag:move', () => console.log('drag:move'));
    draggable.on('drag:stop', () => console.log('drag:stop'));
}*/

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
        initElements.forEach((item) => {
            sqlqb_input.append(inputElement(item.id, item.text));
        });
        sqlqb_input.append(floating_input);
        commitChanges();
        //initDraggable();//make tags draggable
        initSortable();//make tags draggable
    } else {
        console.error('%cContainer for SQL Query Builder is required!. Please provide an container element on initialization (e.g. "#container" or ".container")', 'background-color:#ff5f69; color:white; padding:5px; font-size: 14px;');
    }
}
