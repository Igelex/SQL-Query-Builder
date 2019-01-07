export default class Component {
    constructor(props = {}) {

        this.render = this.render || function () {
        };

        props.store.subscribe(() => this.render());

        if (props.hasOwnProperty('element')) {
            this.element = props.element;
        }
    }
}