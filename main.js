const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const checkAllButton = document.querySelector('.checkAll');
const uncheckAllButton = document.querySelector('.uncheckAll');
const DeleteDataButton = document.querySelector('.deleteSelected');
const items = JSON.parse(localStorage.getItem('items')) || [];

function updateLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items));
}
function deleteDataFromLocalStorage() {
    localStorage.removeItem('items', JSON.stringify(items));
}


function addItem(event) {
    event.preventDefault();

    const text = (this.querySelector('[name=item]')).value; //puedo usar this porque se refiere a todo el form. Buscará dentro del form la etiqueta que tenga el name item.
    const item = {
        text, //en ES6 puedo referirme así a una propiedad que creo y quiero rellenar con algo del mismo nombre.
        done: false
    };

    items.push(item);
    populateList(items, itemsList);
    updateLocalStorage();
    this.reset();
}

//Creo esta función con parámetros nuevos, un array y una lista, para poder usarlos en el futuro con cualquier tipo de dato y lista y poder seguir usando el mismo método.
function populateList(plates = [], plateList) {
    plateList.innerHTML = plates.map((plate, i) => {
        return `
        <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
            <label for="item${i}">${plate.text}</label>
        </li>
        `;
    }).join(''); //Esto hará que todo el array que nos devuelve el map se convierta en un gran string, que es lo que queremos añadir al DOM
}

function toggleDone(event) {
    if (!event.target.matches('input')) return; //compruebo que lo que estoy clicando siempre haga referencia a un input
    const itemSelected = event.target;
    const indexOfItemSelected = itemSelected.dataset.index;
    items[indexOfItemSelected].done = !items[indexOfItemSelected].done; //cambio el valor del checked 
    updateLocalStorage();
    populateList(items, itemsList); //Actualizo visualmente la lista
}

function checkAllInputs() {
    items.forEach(item => {
        item.done = true;
    });
    updateLocalStorage();
    populateList(items, itemsList);
}


function uncheckAllInputs() {
    items.forEach(item => {
        item.done = false;
    });
    updateLocalStorage();
    populateList(items, itemsList);
}

function deleteData() {
    deleteDataFromLocalStorage(); //me borra el localStorage
    while (items.length > 0) { //borro el array
        items.pop();
    }
    populateList(items, itemsList); //repinto con el array vacío
}

populateList(items, itemsList);

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
checkAllButton.addEventListener('click', checkAllInputs);
uncheckAllButton.addEventListener('click', uncheckAllInputs);
DeleteDataButton.addEventListener('click', deleteData);