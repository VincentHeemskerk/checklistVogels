// constants
const jsonFile = 'largelist.json';

const addOverview = (element) => {
    document.getElementById('checklist').appendChild(element);
}

const addChecklist = () => {
    readJSON(jsonFile, function(text) {
        let data = JSON.parse(text);
        createList(data);
    });
}

const addTable = () => {
    readJSON(jsonFile, function(text) {
        let data = JSON.parse(text);
        createTableLarge(data);
    }); 
}

// const createHeaderRow = (row, obj) => {
//     const cell = row.c
// }

const createTableLarge = arr => {
    const table = document.createElement('table');
    arr.forEach(element => {
        const row = table.insertRow();  
        // fill other cells
        Object.keys(element).forEach(function(key, index) {
            const cell = row.insertCell();
            switch(key) {
                case 'spotted':
                    const checkCell = row.insertCell();
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.value = false;
                    checkbox.classList.add('js-checkbox');
                    checkCell.appendChild(checkbox);
                    break;
                case 'url':
                    console.log('url');
                    const link = document.createElement('a');
                    link.href = element[key];
                    link.innerHTML = 'klik voor foto en info';
                    cell.appendChild(link);
                    break;
                default:
                    cell.innerHTML = element[key];
            };
        });      
    });   
    addOverview(table);
}

const readJSON = (file, callback) => {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

document.addEventListener('load', addTable());
