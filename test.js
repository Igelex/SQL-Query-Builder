import {showBuilder} from './src/index';

$(document).ready(() => {
    showBuilder({
        container: '#sqlqb',
        initElements: [{id:1, text:''}, {id:0, text:'email'}, {id:2, text:''}, {id:0, text:'users'}]
    });

});
