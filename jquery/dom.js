$(document).ready( function() {

  // Parent
  // $('#tercera').parent().css({
  //   background: '#1b3d82'
  // });

  // Parents
  // $('#tercera').parents();

  // Children
  // $('#padre').children().fadeOut(500);
  // $('#padre').children('#tercera').fadeOut(500);

  // Find
  //$('#contenedor').find('div.caja').slideUp();

  // Siblings
  //$('#tercera').siblings().fadeOut(1500);

  // Next - Prev
  // $('#tercera').prevAll().css({
  //   background: '#000'
  // });

  $('.caja').first().css({ background: '#000' });
  $('.caja').last().css({ background: '#000' });

  $('.caja').eq(1).css({ background: '#f9a03f' });

  $('.caja').filter('#segunda').css({ background: '#f9a03f' });

  $('caja').not('#segunda').css({ background: '#f9a03f' })




});
