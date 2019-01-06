import store from './store/index.js';
import {CLAUSES} from './const';
import "./Components/InputList";
import InputList from "./Components/InputList";
import ClauseGroups from "./Components/ClauseGroups";
import Output from "./Components/Output";

function initLayout(container) {
    const initial_layout = `
    <div id="sqlqb-container">
        <div class="sqlqb-row">
            <div class="sqlqb-col">
                <div id="sqlqb-input-container"></div>
            </div>
        </div>
        <div id="sqlqb-tags-container"></div>
        <div class="sqlqb-row"><div class="sqlqb-col">
            <div id="sqlqb-output-container">
                <span class="sqlqb-badge">copy</span>
                    <div id="sqlqb-output">
                     
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    document.querySelector(container).innerHTML = initial_layout;

    const claus_groups = new ClauseGroups();
    claus_groups.render();

    const  output = new Output();
    output.render();
}

export function init(
        {
            container,
            initElements
        }
        =
        {
            container: null,
            initElements: []
        }
) {
    if (container && container !== '') {
        initLayout(container);

        if (initElements.length > 0) {
            //append floating input
            initElements.push({id: 0, text: ''});
            console.log(initElements);
            store.dispatch('setInput', initElements.map(item => ({
                id: item.id,
                type: CLAUSES[item.id].type,
                block: CLAUSES[item.id].block,
                name: CLAUSES[item.id].name,
                value: item.text,
            })));
        }

        const inputList = new InputList();
        inputList.render();

        document.getElementById('add').addEventListener('click', () =>{
            console.log('CLICK');
            store.dispatch('addItem', {
                id: 0,
                type: 'value',
                block: true,
                name: 'test',
                value: 'hui',
            });
        });

    } else {
        console.error('%c[SQL Query Builder]: Container for SQL Query Builder is required!. Please provide a container element on initialization (e.g. "#container" or ".container")', 'background-color:#ff5f69; color:white; padding:5px; font-size: 14px;');
    }
}
