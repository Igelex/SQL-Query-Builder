import {tags} from './tags';
import {inputValueTag, inputClauseTag} from './input';

const query_builder_container = $(
    `<div id="query-builder-container">
        <div id="query-builder-input-container">
            <ul id="query-builder-input" class=""></ul>
         </div>        
    </div>`),
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

for (let i in tags) {
    let tag = tags[i];
    switch (tag.type) {
        case 'value':
            appendValueTag(tag.name, i);
            break;
        case 'clause':
            appendClauseTag(tag.name, i);
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

//$('body').append(query_builder_container);

//Add initial Clauses
/*inputClauseTag(1);
inputValueTag('first_name');
inputValueTag('last_name');
inputClauseTag(2);
inputValueTag('users');
inputClauseTag(3);*/


function appendValueTag(name, index) {
    const clause = $(`<span data-clause-id="${index}" class="value-tag clause-tag">${name}</span>`);
    /*clause.click(() => {
        console.warn(index);
        inputValueTag();
    });*/
    query_builder_tags_clauses.append(clause);
}

function appendClauseTag(name, index) {
    name = name.toUpperCase();
    const clause = $(`<span data-clause-id="${index}" class="clause-tag clause">${name}</span>`);
    /*clause.click(() => {
        console.warn(index);
        inputClauseTag(index);
    });*/
    query_builder_tags_clauses.append(clause);
}

function appendOperatorTag(name, index) {
    name = name.toUpperCase();
    const clause = $(`<span data-clause-id="${index}" class="clause-tag operator">${name}</span>`);
    /*clause.click(() => {
        console.warn(index);
        inputClauseTag(index);
    });*/
    query_builder_tags_operators.append(clause);
}

export async function init(container = null) {
    if (container) {
        await $(container).append(query_builder_container);
    } else {

    }
}