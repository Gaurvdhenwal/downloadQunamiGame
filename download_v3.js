$(document).ready(function () {
  $('.section-slider').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    // centerMode:false,
    draggable: true,
    mobileFirst: true,
    dots: true
  });
  // $('#download_button').hi
  document.getElementById('download_button').style.display = 'none';
});
// javascript;
var md = new MobileDetect(window.navigator.userAgent);
var uAgent = md.ua;
// console.log(md.version('Webkit'),md);
var str = /wv/; // to search for webview string in useragent
let browserName;
let browserVer;
if (md.is('UCBrowser')) {
  browserName = 'UCBrowser'
  browserVer = md.version('UCBrowser');
} else if (md.is('SamsungBrowser')) {
  browserName = 'SamsungBroswer'
  browserVer = md.version('SamsungBrowser');
} else if (md.is('Chrome')) {
  browserName = 'Chrome';
  browserVer = md.version('Chrome');
}
var uBrowser = browserName + "_" + browserVer;
var isWebView = uAgent.search(str) != -1 ? 'Webview' : uBrowser;
// document.getElementById('ua').innerHTML = isWebView;



window.Clipboard = (function (window, document, navigator) {
  var textArea,
    copy;

  function isOS() {
    return navigator.userAgent.match(/ipad|iphone/i);
  }

  function createTextArea(text) {
    textArea = document.createElement('textArea');
    textArea.value = text;
    document.body.appendChild(textArea);
  }

  function selectText() {
    var range,
      selection;

    if (isOS()) {
      range = document.createRange();
      range.selectNodeContents(textArea);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
  }



  function copyToClipboard() {
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  copy = function (text) { //copy current url for app to read and send to backend;
    console.log("event ", text)
    ga('send', {
      hitType: 'event',
      eventCategory: 'download_app',
      eventAction: 'download_intent',
      eventLabel: isWebView
    });
    var loc = window.location.search;
    console.log(loc)
    if (loc != '') { // need to fill
      var locationPara = text.split('?')[1];
      var newtext = decodeURIComponent(locationPara)
      var utms = locationPara.split('&');
      var flag = false;
      var utmobj = {}
      utms.forEach(element => {
        // console.log("ty ", element)
        var str = element.split('=')
        utmobj[str[0]] = str[1]
        if (str[0] == 'friend_match' || str[0] == 'ghost_match') {
          flag = true
          // console.log("clipboard copy done")
          var without_hash = text.split('#')[0]
          if (str[0] == 'friend_match')
            var url = without_hash.split("friend_match=")
          else
            var url = without_hash.split("ghost_match=")
          url[1]['src_browser'] = isWebView;
          // console.log("fm****"+url)
          createTextArea(url[1]);
          selectText();
          // verifyValue(text, url[1]);
          copyToClipboard();
        } else if (str[0] == 'referrer') {
          flag = true
          var without_hash = newtext.split('#')[0]
          var url = without_hash.split("referrer=")
          // console.log("wo hash", url, typeof url)
          var newref = url[1].split('&')
          var refobj = {}
          newref.forEach(element => {
            // console.log(element)
            var key = element.split('=')[0]
            var value = element.split('=')[1]
            refobj[key] = value
          })
          refobj['src_browser'] = isWebView;
          // console.log("refobj",refobj)
          createTextArea(text.split('?')[0] + '?' + JSON.stringify(refobj));
          selectText();
          copyToClipboard();
        }
      });
      if (!flag) {
        utmobj['src_browser'] = isWebView; //to send source_browser => app;
        // console.log("url obj"+ text.split('?')[0] + '?' + JSON.stringify(utmobj));
        createTextArea(text.split('?')[0] + '?' + JSON.stringify(utmobj));
        selectText();
        copyToClipboard();
        // verifyValue(text, locationPara);
      }


    }

  };

  return {
    copy: copy
  };
})(window, document, navigator);
var src_b;

function checkDownload() { //to start auto download after opening chrome
  var loc = window.location.search;
  if (loc != '') {
    var locationPara = loc.split('?')[1];
    var utms = locationPara.split('&');
    src_b = locationPara.search('src_browser') != -1 ? locationPara.split('src_browser=')[1] : isWebView;
    //  document.getElementById('ua').innerHTML = src_b;
    var utmobj = {};
    utms.forEach((element) => {
      // console.log("auto download ", element)
      var str = element.split('=');
      // console.log(str);
      if (str[0] == 'start_download') {
        console.log('starting now');
        //  window.alert(src_b);

        // $("#basicModal").modal();
        ga('send', {
          hitType: 'event',
          eventCategory: 'download_app',
          eventAction: 'apk',
          eventLabel: src_b
        }); //send google anylytics an event
        locationPara = locationPara == undefined ? '' : locationPara;
        var trackobj = {}
        trackobj['url_params'] = locationPara
        fbq('trackCustom', 'download_qunami_app_button_click', trackobj);
        // console.log('hello')// download link here
        ajaxDownload.call();
      }

    })
  }

}
var downloading = false; //to prevent multiple clicks on download button
var responseApk;

function getApp() {
  console.log("saving");
  download(responseApk, 'qunami.apk', 'application/vnd.android.package-archive');
}

function ajaxDownload() {
  var request = new XMLHttpRequest(),
    gotFiftyPercent = false;
  let src_broswer = src_b ? src_b : isWebView;
  // console.log(src_b,src_broswer);
  request.addEventListener('readystatechange', function (e) {
    // alert(JSON.stringify(e));
    if (request.readyState == 2 && request.status == 200) {
      // Download is being started
      ga('send', {
        hitType: 'event',
        eventCategory: 'download_app',
        eventAction: 'download_started',
        eventLabel: src_broswer
      });
      console.log("download_started")
      // alert("down started");
      downloading = true;

    } else if (request.readyState == 3) {
      // Download is under progress
      console.log("under progress");
      // alert("under progress");

    } else if (request.readyState == 4) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'download_app',
        eventAction: 'download_complete',
        eventLabel: src_broswer
      });
      responseApk = request.response;
      // download(request.response, 'qunami.apk', 'application/vnd.android.package-archive');
      downloading = false;
      document.getElementById('download_button').style.display = 'block';
      document.getElementById('download_bar').style.display = 'none';
      document.getElementById('download_bar_outline').style.display = 'none';

    }
  });
  request.addEventListener('progress', function (e) {
    var percent_complete = (e.loaded / e.total) * 100;
    var button = document.getElementById('download_progress_bar');
    var txt = document.getElementById('download_text');
    button.style.width = percent_complete + '%';
    if (percent_complete != 100)
      txt.innerHTML = "Downloading.." + Math.round(percent_complete) + '% ';
    else {
      txt.innerHTML = "Downloaded " + percent_complete + '%';
      button.style.width = '0%';
    }
    if (Math.round(percent_complete) == 50 && !gotFiftyPercent) {
      gotFiftyPercent = true;
      ga('send', {
        hitType: 'event',
        eventCategory: 'download_app',
        eventAction: 'download_50',
        eventLabel: src_broswer
      });
    }
    // console.log("percent_complete ",percent_complete);
  });
  request.responseType = 'blob';
  // request.open('get', 'QunamiV1.apk');
  // console.log("http://d2rfwiorfg5fzv.cloudfront.net/QunamiV1.apk");
  request.open('get', 'https://d2rfwiorfg5fzv.cloudfront.net/QunamiV1.apk');
  // request.setRequestHeader('Access-Control-Allow-Origin','http://192.168.0.54:8000');

  request.send();
}