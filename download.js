$(function(){

  $('.download_container').hide(function(){
    $('.great_going').addClass('bounceIn');
    setTimeout(function(){
      console.log('inside function');
      $('.great-going-cont').fadeOut('fast');
      // $('great_going').addClass('zoomOut');
    },1500);

  });
  setTimeout(function(){
    console.log('function two');
    $('.download_container').show('fast');
  },2000);


});
