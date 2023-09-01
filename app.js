//Funcion constructora de los autos
function auto(marca, modelo, ano, precio) {
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
    this.precio = precio;
  }

// Declarar una matriz para almacenar los autos

let listaAutos = [
    new auto('Honda', 'Civic', 2019, 22000),
    new auto('Ford', 'Mustang', 2021, 35000),
    new auto('Chevrolet', 'Camaro', 2018, 32000),
    new auto('Nissan', 'Sentra', 2022, 23000),
    new auto('Toyota', 'Corolla', 2020, 25000),
    new auto('Volkswagen', 'Jetta', 2010, 11000),
    new auto('Toyota', 'Yaris', 2016, 12000),
    new auto('Kia', 'Rio', 2023, 30000),
    new auto('Ford', 'Fiesta', 2012, 2500),
    new auto('Audi', 'A4', 2018, 122000),
    new auto('Bmw', 'M4', 2021, 25000),
];

// formulario de agregar auto
document.getElementById('formulario').addEventListener('submit', function(event) {
   event.preventDefault(); 

    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const ano = document.getElementById('ano').value;
    const precio = document.getElementById('precio').value;

    // Crear un objeto que representa el nuevo auto
    const nuevoAuto = {
        marca: marca,
        modelo: modelo,
        ano: ano,
        precio: precio
    };   
    listaAutos.push(nuevoAuto);
    actualizarListaAutos();
    limpiarFormulario();
});

// Funcion para actualizar la lista de autos en la interfaz
function actualizarListaAutos(autos = listaAutos) {
    const listaAutosElement = document.getElementById('lista-autos');
    listaAutosElement.innerHTML = '';

    autos.forEach((auto, index) => {
        const autoElement = document.createElement('li');
        autoElement.textContent = `${auto.marca} - ${auto.modelo} - Año: ${auto.ano} - precio: ${auto.precio} pesos`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.style.backgroundColor = "grey";
        deleteButton.style.color = "white";
        deleteButton.style.border = "none";
        deleteButton.style.borderRadius = "5px";
        deleteButton.style.cursor = "pointer";
        deleteButton.style.padding = "2px 4px";
        deleteButton.style.margin = "2px 4px";
        
        //  eliminar el auto 
        deleteButton.addEventListener('click', () => eliminarAuto(index));

        autoElement.appendChild(deleteButton);
        listaAutosElement.appendChild(autoElement);
    });
}

// Función para eliminar un auto de la lista
function eliminarAuto(index) {
    listaAutos.splice(index, 1);
    actualizarListaAutos(); 
}

// Función para limpiar los campos del formulario
function limpiarFormulario() {
    document.getElementById('marca').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('ano').value = '';
    document.getElementById('precio').value = '';
}

//evento de escucha al campo de búsqueda
document.getElementById('busqueda').addEventListener('input', function() {
    const term = this.value.toLowerCase(); // Obtener el término de búsqueda en minúsculas
    
    // Filtrar autos en funcion del término de búsqueda
    const autosFiltrados = listaAutos.filter(auto => {
        return (
            auto.marca.toLowerCase().includes(term) || auto.modelo.toLowerCase().includes(term)     
        );
    });

    // Actualizar la lista de autos
    actualizarListaAutos(autosFiltrados);
});

actualizarListaAutos();

// Cargar la lista de autos desde el almacenamiento local
if (localStorage.getItem('listaAutos')) {
    listaAutos = JSON.parse(localStorage.getItem('listaAutos'));
    actualizarListaAutos();
}

// Agregar un evento de escucha al formulario de agregar auto
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();
    localStorage.setItem('listaAutos', JSON.stringify(listaAutos));
});

// Función para eliminar un auto de la lista
function eliminarAuto(index) {
    listaAutos.splice(index, 1);
    actualizarListaAutos();
    
    // Guardar la lista de autos actualizada en el almacenamiento local
    localStorage.setItem('listaAutos', JSON.stringify(listaAutos));
}
