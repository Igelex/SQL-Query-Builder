export default class Component {
    constructor(props = {}) {

        this.render = this.render || function () {
        };

        props.store.subscribe((state) => this.render());

        if (props.hasOwnProperty('element')) {
            this.element = props.element;
        }
    }
}