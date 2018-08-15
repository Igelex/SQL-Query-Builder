export const Store = (function (){

    const _elements = Symbol();

    class Store {
        constructor() {
            this[_elements] = [];
        }

        addElement(position, element) {
            if (this[_elements].length === 0 || position < 0) this[_elements].push(element);
            this[_elements].slice(position, 0, element);
            console.log(this[_elements]);
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