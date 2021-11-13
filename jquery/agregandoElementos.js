$(document).ready(function() {

  let conetenedor = $('#contenedor');
  let contador = 1;

  $('#agregar').on('click', () => {
    var caja = $('<div></div>').attr('class', 'caja').text(contador);
    contador++;

    conetenedor.append(caja);

    // conetenedor.prepend(caja);
    
    // conetenedor.before(caja);
    
    // conetenedor.after(caja);
  });

});