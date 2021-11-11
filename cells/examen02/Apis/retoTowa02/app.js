const cargarPersonas = async() => {
  let resultados;
  try {
    const respuesta = await fetch('https://swapi.dev/api/people/');
    console.log(respuesta);

    if(respuesta.status === 200) {
      const datos = await respuesta.json();
      resultados = datos.results;
    }
    if(respuesta.status === 404) {
      console.log('No se encontro ninguna coincidencia');
    }
    
  }catch(error) {
    console.log(error);
  }
  return resultados;
}

const cargarNombres = async() => {

  let contenedorNombres = ''; 
  const resultados = await cargarPersonas();
  console.log(resultados);

  const nombres = resultados.map( (resultado) => resultado.name);
  console.log(nombres);

  nombres.forEach( (nombre) => {
    contenedorNombres += `
      <div class="contenedor-nombre">
        <p>${nombre}<p>
      </div>
    `;
  });

  document.getElementById('contenedorNombres').innerHTML = contenedorNombres;

}

cargarNombres();