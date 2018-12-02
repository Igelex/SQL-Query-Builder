import store from './store/store.js';
import floating_input from './floating_input';
import {CLAUSES, CLAUSES_TYPES} from './const';
import "./Components/InputList";
import InputList from "./Components/InputList";


//inject all to main container
function commitChanges() {
    store.dispatch('setInput');
}

export function init(
    {container, initElements} = {
        container: null,
        initElements: [{id: 1, text: ''}, {id: 0, text: 'first_name'}, {id: 2, text: ''}, {id: 0, text: 'users'}]
    }
) {
    if (container && container !== '') {
        //$(container).append(sqlqb_container); //inject sqlqb into provided container
        let items = initElements.map( item => ({
            id: item.id,
            type: CLAUSES[item.id].type,
            block: CLAUSES[item.id].block,
            name: CLAUSES[item.id].name,
            value: item.text,
        }));

        store.dispatch('setInput', items);

        const inputList = new InputList();
        //inputList.render();

        //sqlqb_input.append(floating_input);
        //commitChanges();
        //initDraggable();//make tags draggable
        //initSortable();//make tags draggable
    } else {
        console.error('%c[SQL Query Builder]: Container for SQL Query Builder is required!. Please provide a container element on initialization (e.g. "#container" or ".container")', 'background-color:#ff5f69; color:white; padding:5px; font-size: 14px;');
    }
}
