import { getEndDate, getISODatesStr } from "../util/date-functions.js";
import { range } from "../util/number-functions.js";
//constants
const CITY_ID = 'city-id';
const DATE_ID = 'date-id';
const DAYS_ID = 'days-id';
const HOUR_FROM_ID = 'hour-from-id';
const HOUR_TO_ID = 'hour-to-id';
const FORM_ID = 'form-id';
const PROMT_DAYS = 'forecast days';
const PROMT_HOUR_TO = 'hour to';
const PROMT_HOUR_FROM = 'hour from';
export default class WeatherForm {
    #formElement;
    #cityElement;
    #dateElement;
    #daysElement;
    #hourFromElement;
    #hourToElement;
    #formData;
    #maxDays;
    #cities;
    #parentId;
    constructor(parentId, cities, maxDays) {
        this.#parentId = parentId;
        this.#maxDays = maxDays;
        this.#cities = cities;
        this.#formData = {};
        this.#buildForm();
        this.#setElements();
        this.#setHandlers();
        this.#setSelectOptions();
    }
    #cityHandler() {
        this.#formData.city = this.#cityElement.value;
    }
    #daysHandler() {
        const days = +this.#daysElement.value;
        this.#formData.days = days;
        const maxDaysNew = this.#maxDays - days;
        this.#dateElement.max = getEndDate(getISODatesStr(new Date()), maxDaysNew);
        if(this.#formData.startDate != undefined && 
            this.#formData.startDate > this.#dateElement.max){
            delete this.#formData.startDate;
            this.#dateElement.value = '';
        }
    }
    #dateHandler() {
        const dateStr = this.#dateElement.value;
        this.#formData.startDate = dateStr;

        const daysBetween = getDaysBetweenDates(new Date(), new Date(dateStr));
        const maxDaysNew = this.#maxDays - daysBetween;
        if(this.#formData.days == undefined || this.#formData.days > maxDaysNew){
            delete this.#formData.days
            setOptionItems(this.#daysElement, range(0, maxDaysNew + 1), PROMT_DAYS);
        }
    }
    #hourFromHandler() {
        const hour = +this.#hourFromElement.value;
        this.#formData.hourFrom = hour;
        if (this.#formData.hourTo == undefined || this.#formData.hourTo < hour) {
            delete this.#formData.hourTo
            setOptionItems(this.#hourToElement, range(hour, 24), PROMT_HOUR_TO);
        }
    }
    #hourToHandler() {
        const hour = +this.#hourToElement.value
        this.#formData.hourTo = hour;
        if(this.#formData.hourFrom == undefined || this.#formData.hourFrom > hour){
            delete this.#formData.hourFrom;
            setOptionItems(this.#hourFromElement, range(0, hour + 1), PROMT_HOUR_FROM);
        }
    }
    #setHandlers() {
        this.#cityElement.onchange = this.#cityHandler.bind(this);
        this.#dateElement.onchange = this.#dateHandler.bind(this);
        this.#daysElement.onchange = this.#daysHandler.bind(this);
        this.#hourToElement.onchange = this.#hourToHandler.bind(this);
        this.#hourFromElement.onchange = this.#hourFromHandler.bind(this);
        this.#formElement.onreset = () => {
            this.#formData = {};
            this.#setSelectOptions();
        }
    }
    getDataFromForm(){
        return new Promise(resolve => {
            this.#formElement.onchange = (event) => {
                event.preventDefault();
                resolve(this.#formData);
            }
        })
    }
    #setElements() {
        this.#formElement = document.getElementById(`${this.#parentId}-${FORM_ID}`);
        this.#cityElement = document.getElementById(`${this.#parentId}-${CITY_ID}`);
        this.#daysElement = document.getElementById(`${this.#parentId}-${DAYS_ID}`);
        this.#dateElement = document.getElementById(`${this.#parentId}-${DATE_ID}`);
        this.#hourFromElement = document.getElementById(`${this.#parentId}-${HOUR_FROM_ID}`);
        this.#hourToElement = document.getElementById(`${this.#parentId}-${HOUR_TO_ID}`);
    }
    #setSelectOptions() {
        const minDate = getISODatesStr(new Date())
        this.#dateElement.min = minDate;
        this.#dateElement.max = getEndDate(minDate, this.#maxDays);
        setOptionItems(this.#cityElement, this.#cities, 'select city');
        setOptionItems(this.#daysElement, range(0, this.#maxDays + 1), "forecast days");
        setOptionItems(this.#hourFromElement, range(0, 24), 'hour from');
        setOptionItems(this.#hourToElement, range(0, 24), 'hour to');

    }
    #buildForm() {
        const parentElement = document.getElementById(this.#parentId)
        parentElement.innerHTML = `
        <form id="${this.#parentId}-${FORM_ID}" class="form-control">
            <div class="row-input">
                <select id="${this.#parentId}-${CITY_ID}" class="select-control" required></select>
                <select id="${this.#parentId}-${DAYS_ID}" class="select-control" required></select>
            </div>

            <div class="row-input">
                <select id="${this.#parentId}-${HOUR_FROM_ID}" class="select-control" required></select>
                <select id="${this.#parentId}-${HOUR_TO_ID}" class="select-control" required></select>
            </div>
            <div class="date-group-control">
                <label class="label-input" >Enter Start Date</label>
                <input class="date-input" type="date" id="${this.#parentId}-${DATE_ID}" required>
            </div>
            <div class="buttons-group">
                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
            </div>
        </form>
        `
    }
}
function setOptionItems(element, options, placeholder) {
    element.innerHTML = `<option value hidden selected>--${placeholder}--</option>`;
    element.innerHTML += options.map(o => `<option value="${o}">${o}</option>`).join('')
}