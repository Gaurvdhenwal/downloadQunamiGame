$(function(){
  var ghostMatchLink = getUrlParameter("ghostMatch");
  if(ghostMatchLink == undefined){
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
  }
  else{
    console.log("link: "+ghostMatchLink);
    
  }

  function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

});
