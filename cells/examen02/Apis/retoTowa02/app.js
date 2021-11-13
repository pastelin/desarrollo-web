const cargarPersonas = async () => {
  let resultados;
  try {
    const respuesta = await fetch("https://swapi.dev/api/people/");
    console.log(respuesta);

    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      resultados = datos.results;
      cargarNombres(resultados);
    } else if (respuesta.status === 404) {
      console.log("No se encontro ninguna coincidencia");
    } else {
      console.log("No pudo identificar el error");
    }
  } catch (error) {
    console.log(error);
    cargarMensajeError();
  }
};

const cargarNombres = (resultados) => {
  let contenedorNombres = "";
  console.log(resultados);

  const nombres = resultados.map((resultado) => resultado.name);
  console.log(nombres);

  nombres.forEach((nombre) => {
    contenedorNombres += `
      <a class="contenedor-nombre texto">
        ${nombre}
      </a>
    `;
  });

  // Agrega los elementos para los nombres y opciones a elegir
  document.getElementById("contenedorNombres").innerHTML = contenedorNombres;
  cargarOpciones();

  // Agrega evento al contenededor de nombres para que obtenga los datos del nombre seleccionado
  agregarEventoContenedorNombres(resultados);
};

const cargarOpciones = () => {
  let opciones = `
    <a class="contenedor-opcion texto" id="personal">Personal</a>
    <a class="contenedor-opcion texto" id="homeworld">Homeworl</a>
    <a class="contenedor-opcion texto" id="species">Species</a>
    <a class="contenedor-opcion texto" id="vehicles">Vehicles</a>
    <a class="contenedor-opcion texto" id="starships">Starship</a>
  `;
  document.getElementById("contenedorOpciones").innerHTML = opciones;
};

const agregarEventoContenedorNombres = (resultados) => {
  let contenedorNombres = document.getElementById("contenedorNombres");

  contenedorNombres.addEventListener("click", (e) => {
    if (e.target && e.target.tagName === "A") {
      let nombreSeleccionado = e.target.innerText;
      let datosNombreSeleccionado = resultados.filter(
        (resultado) => nombreSeleccionado === resultado.name
      );
      // console.log(datosNombreSeleccionado);

      // Agrega Evento al contenedor de opciones
      agregarEventoContenedorOpciones(datosNombreSeleccionado[0]);
    }
  });
};

const agregarEventoContenedorOpciones = (datosNombreSeleccionado) => {
  console.log(datosNombreSeleccionado);
  const contenedorOpciones = document.getElementById("contenedorOpciones");

  // muestra los datos para la opcion personal
  mostrarDatosPersonal(datosNombreSeleccionado);

  contenedorOpciones.addEventListener("click", (e) => {
    if (e.target && e.target.tagName == "A") {
      //console.log(datosNombreSeleccionado);
      let opcionSeleccionada = e.target.innerText;
      switch (opcionSeleccionada) {
        case "Personal":
          mostrarDatosPersonal(datosNombreSeleccionado);
          break;
        default:
      }
    }
  });
};

const mostrarDatosPersonal = (datosNombreSeleccionado) => {
  let contenido = "";
  let contenedorContenido = document.getElementById("contenido");

  contenido = `
    <h1>${datosNombreSeleccionado.name}</h1>
    <div class="formato-datos">
      <div class="subtitulos">
        <p>name</p> 
        <p>height</p> 
        <p>mass</p> 
        <p>hair_color</p> 
        <p>skin_color</p> 
        <p>eye_color</p> 
        <p>birth_year</p> 
        <p>gender</p> 
      </div>
      <div class="align-right">
        <p>${datosNombreSeleccionado.name}</p> 
        <p>${datosNombreSeleccionado.height}</p> 
        <p>${datosNombreSeleccionado.mass}</p> 
        <p>${datosNombreSeleccionado.hair_color}</p> 
        <p>${datosNombreSeleccionado.skin_color}</p> 
        <p>${datosNombreSeleccionado.eye_color}</p> 
        <p>${datosNombreSeleccionado.birt_year}</p> 
        <p>${datosNombreSeleccionado.gender}</p> 
      </div>
    </div>
  
  `;
  contenedorContenido.innerHTML = contenido;
};

const cargarMensajeError = () => {
  let mensaje = `
    No se logro obtener información, revise su conexión a internet o consulte con su administrador
  `;
  document.getElementById("mensajeError").innerHTML = mensaje;
};

cargarPersonas();


contenido = `
    <h1>${datosNombreSeleccionado.name}</h1>
    <div class="formato-datos">
      <p>name</p> 
      <p>${datosNombreSeleccionado.name}</p> 
    </div>
    <div class="formato-datos">
      <p>height</p> 
      <p>${datosNombreSeleccionado.height}</p> 
    </div>
    <div class="formato-datos">
      <p>mass</p> 
      <p>${datosNombreSeleccionado.mass}</p> 
    </div>
    <div class="formato-datos">
      <p>hair_color</p> 
      <p>${datosNombreSeleccionado.hair_color}</p> 
    </div>
    <div class="formato-datos">
      <p>skin_color</p> 
      <p>${datosNombreSeleccionado.skin_color}</p> 
    </div>
    <div class="formato-datos">
      <p>eye_color</p> 
      <p>${datosNombreSeleccionado.eye_color}</p> 
    </div>
    <div class="formato-datos">
      <p>birth_year</p> 
      <p>${datosNombreSeleccionado.birt_year}</p> 
    </div>
    <div class="formato-datos">
      <p>gender</p> 
      <p>${datosNombreSeleccionado.gender}</p> 
    </div>
  
  
  `;