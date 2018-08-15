export const Core = (function (){

    const _elements = new Symbol();

    class Core {
        constructor() {
            this[_elements] = [];
        }

        addElement(element) {
            this[_elements].push(element);
        }

        removelement() {
            return this[_elements];
        }
    }
    return new Core();

}());