// constants
// const jsonFile = 'vogels.json';
const jsonFile = '8448-Birds-of-Netherlands.taxonomic.json';

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
        // createTable(data);
        createTableLarge(data);
    }); 
}

const createTableLarge = arr => {
    const table = document.createElement('table');
    const firstRow = table.insertRow();
    arr.forEach(element => {
        const row = table.insertRow();
        Object.keys(element).forEach(function(key, index) {
            const cell = row.insertCell();
            cell.innerHTML = element[key];
        });      
    });   
    addOverview(table);

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
            if (key === 'gespot') {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = vogel[key];
                checkbox.classList.add('js-checkbox');
                if (vogel[key] === true) {
                    checkbox.classList.add('isSpotted');
                }
                checkbox.addEventListener('change', function() {
                    this.value = this.checked ? true : false;
                });
                cell.appendChild(checkbox);
            }
            else {
                cell.innerHTML = vogel[key];
            }
        });
        row.classList.add(vogel.foto);
        row.addEventListener('click', function(e) {
            // show modal with picture
            const image = document.createElement('img');
            image.src = './img/'+vogel.foto;
            image.alt = vogel.foto;
            image.classList.add('birdImage');
            document.getElementById('checklist').appendChild(image);
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
    addOverview.appendChild(list);
}
const addItem = (item) => {
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
