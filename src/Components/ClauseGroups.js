import {CLAUSES_TYPES, CLAUSES} from "../const";
import {addClausesEventListeners} from "./Clause";

export default class ClauseGroups {
    render() {
        document.getElementById('sqlqb-tags-container').innerHTML = this.generateGroups();
        this.addGroupEventListeners();
    }

    generateGroups() {
        return `
            <div class="sqlqb-row">
                ${Object.values(CLAUSES_TYPES).filter(type => type !== CLAUSES_TYPES.FLOATING && type !== CLAUSES_TYPES.VALUE)
            .map(type => {
                return `
                          <div class="sqlqb-col">
                            <div id="sqlqb-tags-${type.toLowerCase()}s" class="sqlqb-tags-group sqlqb-collapsed">
                                <h4 class="sqlqb-header sqlqb-collapsed">${type}
                                    <span class="sqlqb-collapsed">+</span>
                                </h4>
                                ${this.generateTags(type)}
                            </div>
                          </div>
                          `;
            }).join('').trim()}
            </div>
        `;
    }

    generateTags(type) {
        return CLAUSES.filter(clause => clause.type === type).map(clause => {
            return `
            <span data-clause-id="${clause.id}"
                  class="sqlqb-tag 
                  sqlqb-tag-${clause.type}">
                  ${clause.name.toUpperCase()}
            </span>
        `;
        }).join('');
    }

    addGroupEventListeners() {
        const groups = document.getElementById('sqlqb-tags-container').querySelectorAll('.sqlqb-tags-group');
        groups.forEach(group => {
            const header = group.querySelector('h4');
            header.addEventListener('click', () => {
                if (group.style.height === '52px' || group.style.height === '') {
                    group.style.height = 100 + '%'; //container[0].scrollHeight + "px" ;
                } else {
                    group.style.height = 52 + 'px';
                }
                group.classList.toggle('sqlqb-collapsed');
                header.classList.toggle('sqlqb-collapsed');
                header.querySelector('span').classList.toggle('sqlqb-collapsed');
            });

            const clauses = group.querySelectorAll('.sqlqb-tag');
            addClausesEventListeners(clauses);
        });
    }
}



