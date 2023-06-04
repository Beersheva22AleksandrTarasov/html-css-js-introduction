export default class EmployeeForm {
    #dataObj;
    #formElement;
    #nameElement;
    #salaryElement;
    #departmentElement;
    #yearElement;
    #parentId;
    #configData
    constructor(parentId, configData) {
        this.#parentId = parentId;
        const parentElement = document.getElementById(parentId);
        parentElement.innerHTML = `<form class="form-control" id="${this.#getId('form')}">
                                   </form>`;
        this.#formElement = document.getElementById(this.#getId('form'))

        this.#configData = configData;
    }
    hideForm() {
        this.#formElement.innerHTML = '';
    }
    #getId(id) {
        return `${this.#parentId}-${id}-id`;
    }
    fillForm(objToUpdate) {
        this.#dataObj = objToUpdate || {}
        this.#formElement.innerHTML =
            `<form class="form-control" id="${this.#getId('form')}">
            <div class="input-item">
                <input id="${this.#getId('name')}" name="name" placeholder="enter name"
                 ${objToUpdate ? `value=${objToUpdate.name}` : ''} required>
                <select id="${this.#getId('department')}" name="department" 
                ${objToUpdate ? `value=${objToUpdate.department}` : ''} required>
                    ${objToUpdate ? '' :
                `<option value hidden selected disabled>--Select Department--</option>`}
                </select>    

            </div>
            <div class="input-item">
                <input id="${this.#getId('birthYear')}" name="birthYear" type="number" placeholder="enter birth year"
                ${objToUpdate ? `value=${objToUpdate.birthYear} readOnly` : ''} required>
                <input id="${this.#getId('salary')}" name="salary" type="number"placeholder="enter salary"
                ${objToUpdate ? `value=${objToUpdate.salary} ` : ''} required>
            </div>
            <div class="radio-group">
                <div class="radio-control">
                    <input id="${this.#getId('female')}" type="radio" name="gender"  ${objToUpdate ?
                `${objToUpdate.gender == "female" ? 'checked' : "unchecked disabled"} ` : 'unchecked'} required value="female" >
                    <label for="${this.#getId('female')}">female</label>
                </div>   
                <div class="radio-control">
                <input id="${this.#getId('male')}" type="radio" name="gender"  ${objToUpdate ?
                `${objToUpdate.gender == "male" ? 'checked' : "unchecked disabled"} ` : 'unchecked'} required value="male" >
                    <label for="${this.#getId('male')}">male</label>
                </div> 
                 
            </div>   
            
            <button type="submit" >Submit</button>
        </form>   

            `
        this.#setElements();
        this.#setOptions();
    }
    #setOptions() {
        const { minYear, maxYear, minSalary, maxSalary, departments } = this.#configData
        this.#departmentElement.innerHTML +=
            departments.map(d => `<option value=${d}
             ${this.#dataObj.department == d ? 'selected' : 'uselected'}>${d}</option>`).join('');
        this.#salaryElement.min = minSalary * 1000;
        this.#salaryElement.max = maxSalary * 1000;
        this.#yearElement.min = minYear;
        this.#yearElement.max = maxYear;
    }
    #setElements() {
        this.#formElement = document.getElementById(this.#getId('form'));
        this.#departmentElement = document.getElementById(this.#getId('department'));
        this.#nameElement = document.getElementById(this.#getId('name'));
        this.#salaryElement = document.getElementById(this.#getId('salary'));
        this.#yearElement = document.getElementById(this.#getId('birthYear'));
    }
    addHandler(submitFn) {
        this.#formElement.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(this.#formElement);
            this.#dataObj.gender = formData.get('gender');
            this.#dataObj.salary = formData.get('salary');
            this.#dataObj.birthYear = formData.get('birthYear');
            this.#dataObj.name = formData.get('name');
            this.#dataObj.department = formData.get('department');
            await submitFn(this.#dataObj);
            this.#formElement.reset();
        }
    }
}