//var selectedRow = null;
var formData ={}; //Array para introduccirle datos del formulario
let datosLS = [];  //datos como objeto a guardar en el localStorage
let datosPapeleraLS = [];  //datos a guardar en el localStorage de la papelera
let contador=0;
let btnCache=document.getElementById("btnCache");
let btnRegistro=document.getElementById("btnRegistro");
let table=document.getElementById("CRUD");
function onFormSubmit()
{
    var formData = readFormData(); 
    insertNewRecord(formData);
    resetForm();
    saveInlocalStorage();
    obtainlocalStorage();
    
    
}

function readFormData() //Leer datos de el formulario
{
   
   formData["numCuenta"] = document.getElementById("numCuenta").value;
   formData["nombre"] = document.getElementById("nombre").value;
   formData["apellidos"] = document.getElementById("apellidos").value;
   formData["telefono"] = document.getElementById("telefono").value;
   formData["birthdate"] = document.getElementById("birthdate").value;
   formData["correo"] = document.getElementById("correo").value;
   return formData;
}



function saveInlocalStorage()
{
    datosLS[contador]=formData;
    for(dato in datosLS[contador])
    {
        
        datosLS[contador][dato];
    }
   
    localStorage.setItem("MostrarDatos",JSON.stringify(datosLS));
    contador++;

}

function obtainlocalStorage()
{
    
    
    if(JSON.parse(localStorage.getItem("MostrarDatos")))
    {
        let Datos=JSON.parse(localStorage.getItem("MostrarDatos"));
        console.log(Datos);
    }
    else
    {
        console.log("No hay ningun dato en el localStorage");
    }
    
}

function Load()
{
    btnCache.hidden = true;
    btnRegistro.hidden = false;
    if(localStorage.getItem("MostrarDatos")!=null)
    {
        data=JSON.parse(localStorage.getItem("MostrarDatos"))
        insertNewRecord(data);
        if(data==null ||data==undefined)
        {
            return insertNewRecord(data);
        }
        
    }
    else
    {
        console.log("No hay ningun dato cargado en el LocalStorage");
    }
}


function insertNewRecord(data) //Insertar datos a la tabla principal
{
    table.getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.numCuenta;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.nombre;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.apellidos;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.telefono;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.birthdate;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.correo;
    cell6 = newRow.insertCell(6);
    cell6.innerHTML = `<button type="button" onclick="onDelete(this)" class="btn btn-danger"">Eliminar</button>`;
               
}

function resetForm()  //Resetea el formulario para agregar nuevos datos
{
    document.getElementById("numCuenta").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("birthdate").value = "";
    document.getElementById("correo").value = "";
   

}

function onDelete(td)  //Eliminar datos
{
  
 if(confirm("¿Estas seguro de que quieres enviar este elemento a la papelera?"))
 {
    row=td.parentElement.parentElement;
    document.getElementById("CRUD").deleteRow(row.rowIndex);
    resetForm();
 }

}

//Crear papelera
function Paperbin()
{
    btnCache.removeAttribute("hidden");
    btnRegistro.hidden = true;
    table.getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
}

function removeCache(){
    localStorage.removeItem('MostrarDatos');
    datosLS = [];
    Paperbin();
}

