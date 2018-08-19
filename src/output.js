import {CLAUSES, CLAUSES_TYPES} from "./const";

/**
 * This method build SQL query string and show it in output container, calls avery time if user make some changes in
 * input
 */
let output_container = null;

export default (elements) => {
    if(!output_container) output_container = $('#sqlqb-output');

    output_container.empty(); //clear container

    elements.forEach((item, i) => {

        let clause = CLAUSES[item.id];
        let text = '';

        if (clause.type === CLAUSES_TYPES.VALUE && item.payload) text = `"${item.payload ? item.payload : 'Enter value'}"`;
        else {text = clause.name.toUpperCase();}

        let elem = $(`<span class="sqldb-output-${clause.type}">${text}</span>`);// clause or value that must be highlighted will be stored in <span>

        output_container.append(elem);

        //add new line
        if (clause.block && i > 0) {
            elem.before('<br>');
        }
    });
    output_container.append('<span class="sqldb-output-clause">;</span>'); // close query with ;
};

function copyOutput() {

}