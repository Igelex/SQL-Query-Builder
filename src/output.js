import {CLAUSES, CLAUSES_TYPES} from "./const";

/**
 * This method build SQL query string and show it in output container, calls avery time if user make some changes in
 * input
 */
let output_container = null;

export default (elements) => {
    if(!output_container) output_container = $('#query-builder-output');

    output_container.empty(); //clear container

    elements.forEach((item, i) => {

        console.group();
        console.log('%cHUI', 'background-color: green');
        console.log(i);
        console.log('i am gray'.gray);
        console.groupEnd();

        let clause = CLAUSES[item.id];
        let elem = $('<span></span>');// clause or value that must be highlighted will be stored in <span>

        switch (clause.type) {
            case CLAUSES_TYPES.ClAUSE:
                elem.text(clause.name.toUpperCase());
                elem.addClass('output-clause');
                break;
            case CLAUSES_TYPES.VALUE:
                elem.text(`"${item.payload ? item.payload : 'Enter value'}"`);
                elem.addClass('output_value');
                break;
            case CLAUSES_TYPES.OPERATOR:
                elem.text(clause.name.toUpperCase());
                elem.addClass('output-operator');
                break;
        }
        output_container.append(elem);

        //add new line
        if (clause.block && i > 0) {
            elem.before('<br>');
        }
    });
    output_container.append('<span class="output-clause">;</span>'); // close query with ;
};