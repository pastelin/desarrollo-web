$(document).ready(function() {

  $('#ejecutar').on('click', function() {
    $('.caja').slideUp(1000, function(){
      $(this).slideDown(1000);
    });
  });

});