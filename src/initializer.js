import store from './store/store.js';
import {CLAUSES} from './const';
import "./Components/InputList";
import InputList from "./Components/InputList";

function initLayout(container) {
    const initial_layout = `
    <div id="sqlqb-container">
        <div class="sqlqb-row">
            <div class="sqlqb-col">
                <div id="sqlqb-input-container"></div>
            </div>
        </div>
    </div>
    `;

    document.querySelector(container).innerHTML = initial_layout;
}

export function init(
        {
            container,
            initElements
        }
        =
        {
            container: null,
            initElements: [{id: 1, text: ''}, {id: 0, text: 'first_name'}, {id: 2, text: ''}, {id: 0, text: 'users'}]
        }
) {
    if (container && container !== '') {
        initLayout(container);

        store.dispatch('setInput', initElements.map(item => ({
            id: item.id,
            type: CLAUSES[item.id].type,
            block: CLAUSES[item.id].block,
            name: CLAUSES[item.id].name,
            value: item.text,
        })));

        const inputList = new InputList();

    } else {
        console.error('%c[SQL Query Builder]: Container for SQL Query Builder is required!. Please provide a container element on initialization (e.g. "#container" or ".container")', 'background-color:#ff5f69; color:white; padding:5px; font-size: 14px;');
    }
}
