$(function () {

    var sclass;
    var questions = [
        {
            question_text: "Which celestial body was redefined as a 'dwarf planet' in 2006?",
            options: ['Mercury', 'Venus', 'saturn', 'Pluto'],
            answer: 3,
            bot_answer: 1
        }, {
            question_text: 'What is the capital of Australia?',
            options: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
            answer: 1,
            bot_answer: 1
        }, {
            question_text: 'Which state in India gained independence from Portugal in 1961?',
            options: ['Goa', 'Tamil Nadu ', 'Punjab', 'Uttar Pradesh'],
            answer: 0,
            bot_answer: 1
        }
    ];
    var qCount = 0;
    var current_question = questions[qCount];
    var correct_ans = new Howl({
     src: ['sounds/Correct_Answer.aac']
   });
    var wrong_ans = new Howl({
     src: ['sounds/Wrong_Answer.aac']
   });
   ga('send', {
   	 hitType: 'event',
  	 eventCategory: 'demo',
  	 eventAction: 'start',
 	});
    setQuestion();
    var answer_clicked = false;

    function setQuestion() {
        answer_clicked =false;
        $('.profile_pic_in_answer').remove();
        $('.answer_options').removeClass('correct_ans wrong_ans');
        $('#player').removeClass('profile_green profile_red');
        $('#bot').removeClass('profile_green profile_red');
        $('.text-span').html(current_question.question_text);
        $('.answer_text').each(function (element, value) {
            console.log(element, value);
            $(value).html(current_question.options[element]);
        });
    }


    $('.answer_options').click(function () {
        console.log($(this).attr('data-id'));
        console.log(qCount);
        if (!answer_clicked) {
            answer_clicked = true;
            console.log("answer clicked");
            gaEvents(qCount+1);//send ga events on answer click
            clickResponse(current_question.answer, $(this).attr('data-id'),'player');
            setTimeout(function () {
                clickResponse(current_question.answer, current_question.bot_answer,'bot');
                console.log('hello');
            }, 1000);
            setTimeout(function () {
                if (qCount < 2) {
                    qCount += 1;
                    current_question = questions[qCount];
                    setQuestion();
                }
                else{
                  var loc = window.location.search;
                    window.location.href = "download.html"+loc; //redirect to facebook campaign
                }
            }, 3000);

        } else {
            answer_clicked = true;
        }


    });
    function gaEvents(count){
      if(count == 1){
        ga('send', {
        	 hitType: 'event',
       	 eventCategory: 'demo',
       	 eventAction: 'demo_q_1_complete',

      	});
      }
      else if(count == 2){
        ga('send', {
        	 hitType: 'event',
       	 eventCategory: 'demo',
       	 eventAction: 'demo_q_2_complete',

      	});
      }
      else if (count == 3) {
        ga('send', {
        	 hitType: 'event',
       	 eventCategory: 'demo',
       	 eventAction: 'completed',

      	});
      }
    }
    function clickResponse(answerindex, answerGiven, givenBy) {
      if (answerindex == answerGiven) {
        sclass = 'correct_ans';
        profileClass = 'profile_green';
        correct_ans.play();
      }
      else {
        sclass = 'wrong_ans';
        profileClass = 'profile_red';
        wrong_ans.play();

      }
      if(givenBy == 'bot'){
        console.log("adding img of bot ans");
        $($('.answer_options')[answerGiven]).append("<div class='profile_pic_in_answer' id='bot'></div>");
      }
      $($('.answer_options')[answerGiven]).addClass(sclass);

      $('#'+givenBy).addClass(profileClass);
      //playmusic
      //show img of opposite player
    }

});
