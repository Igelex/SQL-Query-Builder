import {tags} from './tags';

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


function appendValueTag(name, index) {
    query_builder_tags_clauses.append(`<span data-clause-id="${index}" class="value-tag clause-tag">${name}</span>`);
}

function appendClauseTag(name, index) {
    query_builder_tags_clauses.append(`<span data-clause-id="${index}" class="clause-tag clause">${name}</span>`);
}

function appendOperatorTag(name, index) {
    query_builder_tags_operators.append(`<span data-clause-id="${index}" class="clause-tag operator">${name}</span>`);
}
