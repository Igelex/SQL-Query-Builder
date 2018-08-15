export const Store = (function (){

    const _elements = Symbol();

    class Store {
        constructor() {
            this[_elements] = [];
        }

        addElement(position = this[_elements].length - 1, element) {
            this[_elements].slice(position, 0, element);
        }

        removelement(position) {
            this[_elements].slice(position, 1);
        }

        setElements(elements) {
            this[_elements] = elements;
            console.log(this[_elements]);
        }

        getElements() {
            return this[_elements];
        }
    }

    return new Store();

}());