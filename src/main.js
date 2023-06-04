import CompanyService from "./service/CompanyService.js";
import ApplicationBar from "./ui/ApplicationBar.js";
import DataGrid from "./ui/DataGrid.js";
import EmployeeForm from "./ui/EmployeeForm.js";
import { getRandomEmployee } from "./util/random.js";
import statisticsConfig from "./config/statistics-config.json" assert{type: 'json'}
import employeesConfig from "./config/employees-config.json" assert{type: 'json'}
import serviceConfig from "./config/service-config.json" assert{type: 'json'}

import Spinner from "./ui/Spinner.js";
import CompanyServiceRest from "./service/CompanyServiceRest.js";
const N_EMPLOYEES = 100;
//employee model
//{id: number of 9 digits, name: string, birthYear: number, 
//gender: female | male, salary: number, department: QA, Development, Audit, Accounting, Management}

const sections = [
    { title: "Employees", id: "employees-table-place" },
    { title: "Add Employee", id: "employees-form-place" },
    { title: "Statistics", id: "statistics-place" }
];
const { minSalary, maxSalary, departments, minYear, maxYear } = employeesConfig;
const { age, salary } = statisticsConfig;
const employeeColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'birthYear', headerName: 'Birth Year' },
    { field: 'gender', headerName: 'Gender' },
    { field: 'salary', headerName: 'Salary (ILS)' },
    { field: 'department', headerName: 'Department' }
];
const statisticsColumns = [
    { field: 'min', headerName: "Min value" },
    { field: 'max', headerName: "Max value" },
    { field: 'count', headerName: "Count" }
]
//objects
const menu = new ApplicationBar("menu-place", sections, menuHandler);
const companyService = serviceConfig.baseUrl ? new CompanyServiceRest(serviceConfig.baseUrl) : new CompanyService();
const spinner = new Spinner("spinner-place");
const employeeForm = new EmployeeForm("employees-form-place", employeesConfig);
employeeForm.fillForm();
const updateForm = new EmployeeForm("form-update-place", employeesConfig);
updateForm.addHandler(async (empl) => {
    const updateEmpl = await action(companyService.updateEmployee.bind(companyService, empl));
    employeeTable.updateRow(updateEmpl);

    updateForm.hideForm();
});
const employeeTable = new DataGrid("employees-table-place", employeeColumns, { title: "List of Employees", width: "80vw" },
    [{ name: 'remove', callbackFn: removeEmployee }, { name: 'update', callbachFn: updateEmployee }]);
const ageStatistics = new DataGrid("ages-statistics-place", statisticsColumns, { title: "Age Distribution", width: "30vw" });
const salaryStatistics = new DataGrid("salary-statistics-place", statisticsColumns, { title: "Salary Distribution", width: "30vw" });


employeeForm.addHandler(async (employee) => {

    await action(companyService.addEmployee.bind(companyService, employee));

})

async function menuHandler(index) {
    updateForm.hideForm();
    switch (index) {
        case 0: {
            const employees = await action(companyService.getAllEmployees
                .bind(companyService));
            employeeTable.fillData(employees);
            break;
        }
        case 2: {
            const ageStatisticsData = await action(companyService
                .getStatistics.bind(companyService, age.field, age.interval));
            ageStatistics.fillData(ageStatisticsData);

            const salaryStatisticsData = await action(companyService.getStatistics.bind(companyService,
                salary.field, salary.interval));
            salaryStatistics.fillData(salaryStatisticsData);
            break;
        }
    }
}

async function action(serviceFn) {
    spinner.start();
    const res = await serviceFn();
    spinner.stop();
    return res;
}

async function updateEmployee(id) {
    const empl = await companyService.getEmployee(id);
    updateForm.fillForm(empl);
}

async function removeEmployee(id) {
    if (confirm(`Removing Employee?
    You are going to remove employee with id=${id}`)) {
        await action(companyService.removeEmployee.bind(companyService, id));
        employeeTable.removeRow(id)
    }
}

async function createRandomEmployees() {
    const employees = await companyService.getAllEmployees();
    if (employees.length < 5) {
        for (let i = 0; i < N_EMPLOYEES; i++) {
            await companyService.addEmployee(getRandomEmployee(minSalary, maxSalary,
                minYear, maxYear, departments));
        }
    }
}
action(createRandomEmployees);