var cajas = document.getElementsByTagName('div');

var primeraCaja = document.getElementById('primeraCaja');

// cajas[0].textContent = 'hola mundo';

// Creando nodos
let caja = document.createElement('div');

let contenido = document.createTextNode('Hola Mundo');

caja.appendChild(contenido);

//caja.setAttribute('class', 'caja naranja');

// let contenedor = document.getElementById('contenedor');
// contenedor.appendChild(caja);

// Modificando la clase o id de un elemento
caja.id = 'primera';
caja.className = 'caja naranja';

  // Conociendo el elemento padre
let padre = cajas[0].parentNode;

// padre.insertBefore(caja, primeraCaja);
// padre.insertBefore(caja, cajas[2]);

  // Reemplazando un nodo
padre.replaceChild(caja, cajas[2]);

  // Eliminar nodos
  padre.removeChild(cajas[3]);
