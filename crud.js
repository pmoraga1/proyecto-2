
const form = document.getElementById('formulario');
const idinput = document.getElementById('idinput');
const fechainput = document.getElementById('fechainput');
const clienteinput =  document.getElementById('clienteinput');
const ubicacioninput =  document.getElementById('ubicacioninput');

/*const searchinput = document.getElementById('buscador');
const searchbutton = document.getElementById('searchbutton');

searchbutton.addEventListener('click', handleSearch)*/

const tablebody = document.getElementById('tablebody');

let data = JSON.parse(localStorage.getItem('formData')) || [];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const IDSensor = idinput.value;
    const Fecha = fechainput.value;
    const Cliente = clienteinput.value;
    const Ubicacion = ubicacioninput.value;

    if(IDSensor && Fecha && Cliente && Ubicacion){
        const newData = {IDSensor, Fecha, Cliente, Ubicacion};
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
        

    }else{
        alert('Se deben completar todos los datos');
    }


})
 

function saveDataToLocalStorage() { 
    localStorage.setItem('formData', JSON.stringify(data));

}

/* limpiar contenido de table cada vez que actualice */

function renderTable() {
    tablebody.innerHTML = '';
    data.forEach(function(item,index) {
        const row = document.createElement('tr');
        const IDSensorcell = document.createElement('td');
        const Fechacell = document.createElement('td');
        const Clientecell = document.createElement('td');
        const Ubicacioncell = document.createElement('td');
        const accioncell = document.createElement('td');

        const editbutton = document.createElement('button');
        const eliminarbutton = document.createElement('button');

        IDSensorcell.textContent = item.IDSensor;
        Fechacell.textContent = item.Fecha.split('-').reverse().join('-');
        Clientecell.textContent = item.Cliente;
        Ubicacioncell.textContent = item.Ubicacion;

        editbutton.classList.add('button', 'button-secondary', 'fa-regular', 'fa-pen-to-square');
        eliminarbutton.classList.add('button', 'button-terciary', 'fa-solid', 'fa-trash');

        editbutton.addEventListener('click', function(){
            editData(index);
            
        })

        eliminarbutton.addEventListener('click', function(){
            deleteData(index);
        })

        accioncell.appendChild(editbutton);
        accioncell.appendChild(eliminarbutton);

        row.appendChild(IDSensorcell);
        row.appendChild(Fechacell);
        row.appendChild(Clientecell);
        row.appendChild(Ubicacioncell);
        row.appendChild(accioncell);
        
        tablebody.appendChild(row);



    })
}

function editData(index){
    const item = data[index];
    idinput.value = item.IDSensor;
    fechainput.value = item.Fecha;
    clienteinput.value = item.Cliente;
    ubicacioninput.value = item.Ubicacion;
    data.splice(index,1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index){
    data.splice(index,1);
    saveDataToLocalStorage();
    renderTable();
}

/* function handleSearch(event){
    event.preventDefault
    alert(searchinput.value);
}*/



renderTable();
