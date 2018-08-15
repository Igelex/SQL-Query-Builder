import {Store} from "./store";
import {CLAUSES, CLAUSES_TYPES} from "./const";

/**
 * This method build SQL query string and show it in output container, calls avery time if user make some changes in
 * input
 */
let output_container = null;

export default (elements) => {
    if(!output_container) output_container = $('#query-builder-output');

    output_container.empty(); //clear container

    console.error(output_container);

    //let query_items = Store.getElements(); //get all clauses, added by user

    elements.forEach((item, i) => {

        console.log(item);
        console.log(i);

        let clause = CLAUSES[item.id];
        let elem = $('<span></span>');// clause or value that must be highlighted will be stored in <span>

        switch (clause.type) {
            case CLAUSES_TYPES.ClAUSE:
                elem.text(clause.name.toUpperCase());
                elem.addClass('output-clause');
                break;
            case CLAUSES_TYPES.VALUE:
                elem.text(` "${item.payload}"`);
                elem.addClass('output_value');
                break;
            case CLAUSES_TYPES.OPERATOR:
                elem.text(clause.name.toUpperCase());
                elem.addClass('output-operator');
                break;
        }
        output_container.append(elem);

        if (clause.block && i > 0) {
            elem.before('<br>');
        }
    });
    output_container.append('<span class="output-clause">;</span>'); // close query with ;
};