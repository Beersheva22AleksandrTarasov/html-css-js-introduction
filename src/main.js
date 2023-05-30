import CompanyService from "./service/CompanyService.js";
import ApplicationBar from "./ui/ApplicationBar.js";
import DataGrid from "./ui/DataGrid.js";
import EmployeeForm from "./ui/EmployeeForm.js";
import { getRandomEmployee } from "./util/random.js";
import employeesConfig from "./config/employees-config.json" assert{type: 'json'};
import statisticsConfig from "./config/statistics-config.json" assert{type: 'json'};
//employee model
//{id: number of 9 digits, name: string, birthYear: number, 
//gender: female | male, salary: number, department: QA, Development, Audit, Accounting, Management}

const sections = [
    {title: "Employees", id: "employees-table-place"},
    {title: "Add Employee", id: "employees-form-place"},
    {title: "Statistics", id: "statistics-place"}
];
const {minSalary, maxSalary, departments, minYear, maxYear} = employeesConfig;
const {age, salary} = statisticsConfig;
const statisticsIndex = sections.findIndex(s => s.title == "Statistics");
const employeeColumns = [
    {field: 'id', headerName: 'ID'},
    {field: 'name', headerName: 'Name'},
    {field: 'birthYear', headerName: 'Birth Year'},
    {field: 'gender', headerName: 'Gender'},
    {field: 'salary', headerName: 'Salary (ILS)'},
    {field: 'department', headerName: 'Department'}
];
const statisticsColumns = [
    {field: 'min', headerName: "Min value"},
    {field: 'max', headerName: "Max value"},
    {field: 'count', headerName: "Count"}
]

const menu = new ApplicationBar("menu-place", sections, statisticsHandler);
const companyService = new CompanyService();
const employeeForm = new EmployeeForm("employees-form-place");
const employeeTable = new DataGrid("employees-table-place", employeeColumns);
const ageStatistics  = new DataGrid("ages-statistics-place", statisticsColumns);
const salaryStatistics = new DataGrid("salary-statistics-place", statisticsColumns);
function statisticsHandler(index){
    if(index == statisticsIndex){
        ageStatistics.fillData(companyService.getStatistics(age.field, age.interval));
        salaryStatistics.fillData(companyService.getStatistics(salary.field, salary.interval));
    }
}
async function run(){
    while(true){
        await employeeForm.buttonHasPressed();
        const employee = getRandomEmployee(minSalary, maxSalary, minYear, maxYear, departments);
        const employeeAdded = companyService.addEmployee(employee);
        employeeTable.insertRow(employeeAdded);
    }
    
}
run();
