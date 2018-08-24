import Component from './Component.js';

export default class Tag extends Component {

    constructor(clause) {
        super({
            element: $('<span></span>')
        });
        this.clause = clause;
    }

    render() {
        let self = this;

        if(store.state.items.length === 0) {
            self.element.innerHTML = `<p class="no-items">You've done nothing yet &#x1f622;</p>`;
            return;
        }

        self.element.innerHTML = `
      <ul class="app__items">
        ${store.state.items.map(item => {
            return `
            <li>${item}<button aria-label="Delete this item">×</button></li>
          `
        }).join('')}
      </ul>
    `;

        self.element.querySelectorAll('button').forEach((button, index) => {
            button.addEventListener('click', () => {
                store.dispatch('clearItem', { index });
            });
        });
    }
};export default class Component {
    constructor(props = {}) {
        let self = this;

        this.render = this.render || function() {};

        if(props.hasOwnProperty('element')) {
            this.element = props.element;
        }

        if(props.hasOwnProperty('classes')) {
            this.classes = props.classes;
        }

        if(props.hasOwnProperty('id')) {
            this.id = props.id;
        }

        if(props.hasOwnProperty('data_attribute')) {
            this.data_attribute = props.data_attribute;
        }

        if(props.hasOwnProperty('value')) {
            this.value = props.value;
        }
    }
}