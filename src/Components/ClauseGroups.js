import {CLAUSES_TYPES, CLAUSES} from "../const";

export default class ClauseGroups {
    render() {
        document.getElementById('sqlqb-tags-container').innerHTML = this.generateGroups().trim();
    }

    generateGroups() {
        return `
            <div class="sqlqb-row">
                ${Object.values(CLAUSES_TYPES).filter(type => type !== CLAUSES_TYPES.FLOATING && type !== CLAUSES_TYPES.VALUE)
            .map(type => {
                return `
                          <div class="sqlqb-col">
                            <div id="sqlqb-tags-${type.toLowerCase()}s" class="sqlqb-tags-group">
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
}

