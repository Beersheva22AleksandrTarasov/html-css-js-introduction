export default class DataGrid {
    #tBodyElement
    #keys
    constructor(parentId, columns) {
        // columns - array of objects (field: <name of key>,
        // headerName: <column name>)
        this.#keys = columns.map(c => c.field);
        this.buildTableHeader(parentId, columns.map(c => c.headerName))
    }
    fillData(rowsData) {
        this.#tBodyElement.innerHTML = rowsData.map(rd => this.#getRow(rd)).join('');
    }
    #getRow(obj) {
        return `<tr>
                   ${this.#keys.map(key => `<td>${obj[key]}</td>`).join('')}
                 </tr>`
    }
    buildTableHeader(parentId, columnNames) {
        const tableSectionElement = document.getElementById(parentId);
        tableSectionElement.innerHTML =
            `<table>
            <theader>
                <tr>
                    ${columnNames.map(headerName => `<th>${headerName}</th>`).join('')}
                </tr>
            </thead>
            <tbody id="${parentId}-table">
            </tbody>
        </table>`
        this.#tBodyElement = document.getElementById(parentId + "-table")
    }
}