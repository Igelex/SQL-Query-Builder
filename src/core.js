export const Core = (function (){

    const _elements = new Symbol();

    class Core {
        constructor() {
            this[_elements] = [];
        }

        addElement(position = this[_elements].length - 1, element) {
            this[_elements].slice(position, 0, element);
        }

        removelement(position) {
            this[_elements].slice(position, 1);
        }

        getElements() {
            return this[_elements];
        }
    }
    return new Core();

}());