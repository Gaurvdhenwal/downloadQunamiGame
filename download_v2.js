$(function(){
  
  var url = decodeURIComponent(window.location.search.substring(1));
  var friendMatchLink = getUrlParameter("friend_match",url);
  var ghostMatchLink = getUrlParameter("ghost_match",url);
  if(ghostMatchLink == undefined && friendMatchLink == undefined){
    //if not a ghost match or a friednmatch link show normal animation
    $('.great_going').css({'opacity':0,'opacity':1})
    $('.great_going').addClass('bounceIn');
   // $('#general-heading').css({"display":"none"});
     $('#ghostMatch-heading').css("display","none");
     $('#ghostMatch-heading-2').css("display","none");
    
    // //hiding and showing
    // $('.w-container').css("display",'none');
    setTimeout(function(){
      // console.log('inside function');
      $('.great-going-cont').fadeOut('fast');
      
      // $('great_going').addClass('zoomOut');
    },1500);
    setTimeout(function(){
      $('.w-container').css({'opacity':0,'opacity':1})
      $('body').css({'background':"url('images/new/bg.png')  no-repeat center center fixed, #100226"})
      $('body').css({'backgroundSize':'cover'})

      $('.w-container').css({'zIndex':-1,'zIndex':10})
      // $('.w-container').show('fast');
    },2000);
  }
  else{
    $('.great-going-cont').css({'opacity':0,'zIndex':-10});
    $('.w-container').css({'opacity':0,'opacity':1})
    // $('.w-container').show('fast');
    // $('#featureCont').addClass('featureContDown');
    // $('#apk_download').addClass('downloadbtnUp');
    // // console.log("ghostlink: "+ghostMatchLink);
    // // console.log("friendlink: "+friendMatchLink);
    $('#general-heading').css("display","none");
      // $('#playerIcon').css("display",'block');
    $('#ghostMatch-heading').css("display","block");
    $('#ghostMatch-heading-2').css("display","block");

    var creator = getLinkValues("g_owner",ghostMatchLink,friendMatchLink);
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
  function getLinkValues(param,ghostlink,friendlink){
    var linkObj;
    var name;
    if(friendlink !=undefined){
      // console.log(friendlink);
      linkObj = JSON.parse(friendlink.split('?')[1]);
      name = linkObj[param].split('+')[0];
    }
    else{
      linkObj = JSON.parse(ghostlink.split('?')[1]);
      name = linkObj[param].split('+')[0];
      // console.log(linkObj[param]);

    }

    return name;
  }

});
