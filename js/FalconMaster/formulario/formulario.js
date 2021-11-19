(function(){

  let bandera;

  let formulario = document.getElementById('formulario'),
      nombre = formulario.nombre,
      correo = formulario.correo,
      sexo = formulario.sexo,
      terminos = formulario.terminos,
      error = document.getElementById('error');

  function validarNombre(e) {
    if (nombre.value == '' || nombre.value == null) {
      error.style.display = 'block';
      error.innerHTML += '<li>Por favor completa el nombre</li>'
      bandera++;
      e.preventDefault();
    }
    else {
      if (bandera == 4) {
        error.style.display = 'none';
      }
    }
  }

  function validarcorreo(e) {
    if (correo.value == '' || correo.value == null) {
      error.style.display = 'block';
      error.innerHTML += '<li>Por favor completa el correo</li>'
      bandera++;
      e.preventDefault();
    }
    else {
      if (bandera == 4) {
        error.style.display = 'none';
      }
    }
  }

  function validarSexo(e) {
    if (sexo.value == '' || sexo.value == null) {
      error.style.display = 'block';
      error.innerHTML += '<li>Por favor completa el sexo</li>';
      bandera++;
      e.preventDefault;
    }
    else {
      if (bandera == 4) {
        error.style.display = 'none';
      }
    }
  }

  function validarTerminos(e) {
    if (terminos.checked == false) {
      error.style.display = 'block';
      error.innerHTML += '<li>Por favor acepta los terminos</li>';
      e.preventDefault;
    }
    else {
      if (bandera == 4) {
          error.style.display = 'none';
      }

    }
  }

  function validarFormulario(e) {
    error.innerHTML = '';
    bandera = 4;
    validarNombre(e);
    validarcorreo(e);
    validarSexo(e);
    validarTerminos(e);
  }

  formulario.addEventListener('submit', validarFormulario);

}())
