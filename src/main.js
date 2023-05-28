import OpenMeteoConfig from './config/service-config.json' assert {type: 'json'};
import OpenMeteoService from './service/OpenMeteoService.js';
import DataGrid from './ui/DataGrid.js';
//constants
const columns = [
    { field: 'date', headerName: 'Date' },
    { field: 'time', headerName: 'Time' },
    { field: 'temperature', headerName: 'Temperature' },
    { field: 'apparentTemperature', headerName: 'Fealt Temp' }
];
//functions
function getISODatesStr(date) {
    return date.toISOString().substring(0, 10)
}
function getEndDate(startDateStr, days) {
    const date = new Date(startDateStr);
    const endDate = new Date(date.setDate(date.getDate() + days));
    return getISODatesStr(endDate);
}
const fromFormData = {
    city: 'Rehovot', startDate: getISODatesStr(new Date()),
    days: 5, hourFrom: 10, hourTo: 14
};

//objects
const openMeteoService = new OpenMeteoService(OpenMeteoConfig.baseUrl);
const table = new DataGrid("table-place", columns);
const latLong = OpenMeteoConfig.cities[fromFormData.city];
const { lat, long } = latLong;

const { startDate, days, hourFrom, hourTo } = fromFormData;
openMeteoService.getTemperatures(lat, long, startDate,
    getEndDate(startDate, days), hourFrom, hourTo).then(data => table.fillData(data))


