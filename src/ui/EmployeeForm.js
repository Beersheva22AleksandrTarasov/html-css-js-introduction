import employeesConfig from "../config/employees-config.json" assert{type: 'json'};

export default class EmployeeForm {

    #dataObj;
    #formElement;
    constructor(parentId) {
        const parentElement = document.getElementById(parentId);
        this.#dataObj = {};
        this.#fillForm(parentElement, parentId);
        this.#setElements(parentId);

    }
    #fillForm(parentElement, parentId) {
        parentElement.innerHTML =
            `<form class="form-control" id="${parentId}-form-id">
                <div class="radio-group">
                    <div class="radio-control">
                        <input id="female-id" type="radio" name="gender" required value="female" unchecked>
                        <label for="female-id">female</label>
                    </div>
                    <div class="radio-control">
                        <input id="male-id" type="radio" name="gender" required value="male" unchecked>
                        <label for="male-id">male</label>
                    </div>
                </div>
                    <input type="number" name="salary" min="7000" max="50000" placeholder="enter salary"><br>
                    <input type="text" name="name" required placeholder="enter name"> 
                    <input type="number" name="birthYear" min="1950" max="2005" required placeholder="enter birthYear"> 
                    <select id="departments" name="department" required> 
                    <option value="" disabled selected>-- Select department --</option>
                    </select><br>
                <div class="button-group">
                    <button type="submit">Submit</button>
                    <button type="submit">Reset</button>
                </div>
            </form>`;
        const departmentSelect = document.getElementById("departments");
        setOptionItems(departmentSelect, employeesConfig.departments, 'select department');
        function setOptionItems(element, options, placeholder) {
            element.innerHTML = `<option value hidden selected>--${placeholder}--</option>`;
            element.innerHTML = options.map(o => `<option value="${o}">${o}</option>`).join('');
        }
    }

    #setElements(parentId) {
        this.#formElement = document.getElementById(`${parentId}-form-id`);

    }
    addHandler(submitFn) {
        this.#formElement.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(this.#formElement);
            this.#dataObj.gender = formData.get('gender');
            this.#dataObj.salary = formData.get('salary');
            this.#dataObj.department = formData.get('department');
            this.#dataObj.name = formData.get('name');
            this.#dataObj.birthYear = formData.get('birthYear');
            await submitFn(this.#dataObj);
        }
    }

}