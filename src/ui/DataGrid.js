export default class DataGrid {
    #tBodyElement
    #keys
    #actions
    constructor(parentId, columns, caption, actions) {
        //columns - array of objects {field: <name of key>,
        // headerName: <column name>}
        this.#keys = columns.map(c => c.field);
        this.#buildTableHeader(parentId, caption, columns.map(c => c.headerName));
        this.#actions = actions;

    }
    fillData(rowsData) {
        this.#tBodyElement.innerHTML = rowsData.map(rd => this.#getRow(rd)).join('');
        this.setActionListeners();
    }
    setActionListeners() {
        if (this.#actions) {
            const buttons = document.querySelectorAll(`[data-button]`);
            buttons.forEach(b => {
                b.onclick = async () => {
                    const idTokens = b.id.split("-", 2);
                    const action = this.#actions.find(a => a.name == idTokens[1]);
                    await action.callbackFn(idTokens[0]);
                };
            });
        }
    }

    removeRow(id) {
        const trElement = document.getElementById('i' + id);
        if (trElement) {
            trElement.remove();
        }

    }
    updateRow(obj) {
        const trElement = document.getElementById(`i${obj.id}`);
        if (trElement) {
            trElement.innerHTML = this.#getTds(obj)
        }
        this.setActionListeners();
    }
    #getTds(obj) {
        let data = this.#keys.map(key => `<td>${obj[key]}</td>`).join('');
        if (this.#actions) {
            const buttons = this.#actions.map(a =>
                `<td><button data-button id="${obj.id}-${a.name}">${a.name}</button></td>`).join('');
            data += buttons;
        }
        return data;
    }
    #getRow(obj) {
        const row = `<tr id="i${obj.id}">
                   ${this.#getTds(obj)}
                 </tr>`;
        return row;
    }
    insertRow(obj) {
        this.#tBodyElement.innerHTML += this.#getRow(obj);
        this.setActionListeners();
    }
    #buildTableHeader(parentId, caption, columnNames) {
        const tableSectionElement = document.getElementById(parentId);
        tableSectionElement.innerHTML =
            `<table> <caption style="width: ${caption.width}; "> ${caption.title} </caption>
            <thead>
               <tr>
                   ${columnNames.map(headerName => `<th>${headerName}</th>`).join('')}
                   ${this.#actions ?
                Array.from({ length: this.#actions.length }.map(() => `<th></th>`)) : ''}
               </tr>
            </thead>
            <tbody id="${parentId}-table" >
            </tbody>
          </table>`
        this.#tBodyElement = document.getElementById(parentId + "-table")

    }
}