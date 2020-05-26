// constants
const jsonFile = 'vogels.json';

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
        createTable(data);
    }); 
}

const createTable = arr => {
    const table = document.createElement('table');
    const firstRow = table.insertRow();
    for(let i = 0; i < Object.keys(arr.vogellijst.vogels[0]).length; i++) {
        const cell = firstRow.insertCell();
        cell.innerHTML = Object.keys(arr.vogellijst.vogels[0])[i];
    }
    arr.vogellijst.vogels.forEach(vogel => {
        const row = table.insertRow();
        Object.keys(vogel).forEach(function(key, index) {
            const cell = row.insertCell();
            cell.innerHTML = vogel[key];
        })
    });
    addOverview(table);
}

const createList = arr => {
    const list = document.createElement("ul");
    arr.vogellijst.vogels.forEach(vogel => {
        const liItem = document.createElement("li");
        const liText = document.createTextNode(addItem(vogel));
        liItem.appendChild(liText);
        list.appendChild(liItem);
    });
    // addOverview.appendChild(list);
}
const addItem = (item) => {
    console.log(item.naam);
    return item.naam;
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

// read json file
// create table
// for each bird, make row with following data
    // isGespot
    // naam
    // latijnse naam
    // datum
    // opmerkingen

