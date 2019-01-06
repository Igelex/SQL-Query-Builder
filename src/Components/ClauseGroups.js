import {CLAUSES_TYPES, CLAUSES} from "../const";

export default class ClauseGroups {
    render() {
        document.getElementById('sqlqb-tags-container').innerHTML = this.generateGroups().trim();
        this.addEventListeners();
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
            }).join('')
            }
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

    addEventListeners() {
        const groups = document.getElementById('sqlqb-tags-container').querySelectorAll('.sqlqb-tags-group');
        console.log(groups);
        groups.forEach(group => {
            const header = group.querySelector('h4');
            header.addEventListener('click', ()=> {
                console.log('CLICKED');
                if (group.style.height === '52px' || group.style.height === ''){
                    group.style.height = 100 + '%'; //container[0].scrollHeight + "px" ;
                } else {
                    group.style.height = 52 + 'px';
                }
                group.classList.toggle('sqlqb-collapsed');
                header.classList.toggle('sqlqb-collapsed');
                header.querySelector('span').classList.toggle('sqlqb-collapsed');
            });
        });

    }
}

