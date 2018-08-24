export default class Component {
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