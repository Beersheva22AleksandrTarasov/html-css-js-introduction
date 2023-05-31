export default class Spinner{
    #spinnerElement;
    constructor(parentID){
        const parentElement = document.getElementById(parentID);
        parentElement.innerHTML = `<div class="spinner" hidden></div>`;
        this.#spinnerElement = parentElement.childNodes[0];
        
    }
    start(){
        this.#spinnerElement.hidden = false;

    }
    stop(){
        this.#spinnerElement.hidden = true;
    }
}