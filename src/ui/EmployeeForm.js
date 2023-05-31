export default class EmployeeForm {
    #buttonElement;
    #parentElement;
    constructor(parentId) {
        this.#parentElement = document.getElementById(parentId);
        this.#fillSection();
        this.#buttonElement = document.getElementById('button-id');
    }
    #fillSection() {
        this.#parentElement.innerHTML =
            `<button id="button-id">Add random employee data</button>`;
    }
    addHandler(submitFn) {
        this.#buttonElement.onclick = submitFn;
    }

}