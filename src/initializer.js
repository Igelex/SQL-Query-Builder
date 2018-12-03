import store from './store/index.js';
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
    <div id="sqlqb-tags-container">
    <div class="sqlqb-row">
        <div class="sqlqb-col">
            <div id="sqlqb-tags-clauses" class="sqlqb-tags-group">
                <h4 class="sqlqb-header sqlqb-collapsed">Clauses
                    <span class="sqlqb-collapsed">+</span>
                </h4>
                <span data-clause-id="0" class="sqlqb-tag sqlqb-tag-value">Enter value</span>
                <span data-clause-id="1" class="sqlqb-tag sqlqb-tag-clause">SELECT</span>
                <span data-clause-id="2" class="sqlqb-tag sqlqb-tag-clause">FROM</span>
            </div>
        </div>
        <div class="sqlqb-col">
            <div id="sqlqb-tags-operators" class="sqlqb-tags-group">
                <h4 class="sqlqb-header sqlqb-collapsed">
                    Operators<span class="sqlqb-collapsed">+</span>
                </h4>
                <span data-clause-id="9" class="sqlqb-tag sqlqb-tag-operator">NOT</span>
                <span data-clause-id="10" class="sqlqb-tag sqlqb-tag-operator">IS NOT NULL</span>
                <span data-clause-id="11" class="sqlqb-tag sqlqb-tag-operator">IS NULL</span>
                <span data-clause-id="12" class="sqlqb-tag sqlqb-tag-operator">AND</span>
            </div>

            <div class="sqlqb-col">
                <div id="sqlqb-tags-TEST" class="sqlqb-tags-group"><h4 class="sqlqb-header">TEST<span>+</span></h4>
                </div>
            </div>
            <div class="sqlqb-col">
                <div id="sqlqb-tags-TEST1" class="sqlqb-tags-group"><h4 class="sqlqb-header">TEST<span>+</span></h4>
                </div>
            </div>
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
            initElements: []
        }
) {
    if (container && container !== '') {
        initLayout(container);

        if (initElements.length > 0) {
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
                id: 'id',
                type: 'clause',
                block: true,
                name: 'test',
                value: 'hui',
            });
        });

    } else {
        console.error('%c[SQL Query Builder]: Container for SQL Query Builder is required!. Please provide a container element on initialization (e.g. "#container" or ".container")', 'background-color:#ff5f69; color:white; padding:5px; font-size: 14px;');
    }
}
