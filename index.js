import 'bootstrap';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

let clauses = document.querySelectorAll('.clause:not(.clause_selected)');
let clause_value = document.querySelectorAll('.clause_value:not(.clause_selected)')[0];
console.log(clauses);
let input = document.getElementById('sql_input');

for (let i= 0; i < clauses.length; i++) {
    clauses[i].textContent
}

clause_value.addEventListener('click', () =>{

    const clause_value_template =
        `<div class="clause_value_container clause_selected">
            <input type="text" class="value_input" placeholder="Enter value">
            <span>&times;</span>
        </div>`;

    let new_clause_value = new DOMParser().parseFromString(clause_value_template, 'text/html').getElementsByClassName('clause_selected')[0];
    new_clause_value.addEventListener('click', () => {
        input.removeChild(new_clause_value);
    });
    input.appendChild(new_clause_value);
});

clauses.forEach((tag) => {
    tag.addEventListener('click', () => {
        let new_tag = document.createElement('span');
        new_tag.textContent = tag.textContent;
        new_tag.classList.add('clause_tag');
        new_tag.classList.add('clause_selected');
        new_tag.addEventListener('click', () => {
            input.removeChild(new_tag);
        });
        input.appendChild(new_tag);
    });
});
