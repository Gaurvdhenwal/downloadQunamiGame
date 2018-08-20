$(function(){
  var url = decodeURIComponent(window.location.search.substring(1));
  var ghostMatchLink = getUrlParameter("ghost_match",url);
  if(ghostMatchLink == undefined){

    $('#general-heading').css("display","block");
    $('#ghostMatch-heading').css("display","none");
    $('#ghostMatch-heading-2').css("display","none");

    //hiding and showing
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
    $('.download_container').show('fast');
    console.log("link: "+ghostMatchLink);
    $('#general-heading').css("display","none");
    $('#ghostMatch-heading').css("display","block");
    $('#ghostMatch-heading-2').css("display","block");
    $('.great-going-cont').css('display','none');
    var creator = getLinkValues("g_owner",ghostMatchLink);
    $('#ghost-name').html(creator);
  }

  function getUrlParameter(sParam,url) {
    var sPageURL = url,
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}
  function getLinkValues(param,link){

    var linkObj = JSON.parse(link.split('?')[1]);
    var name = linkObj[param].split('+')[0];
    console.log(linkObj[param]);

    return name;
  }

});
