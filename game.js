$(function () {

    var sclass;
    var questions = [
        {
            question_text: 'Which cricketer started Sehwag International School in Haryana?',
            options: ['Virender Sehwag', 'Amit Mishra', 'Kapil Dev', 'Shikhar Dhawan'],
            answer: 0,
            bot_answer: 2
        }, {
            question_text: 'What is the currency of India?',
            options: ['ethereum', 'rupiah', 'copper', 'rupee'],
            answer: 3,
            bot_answer: 3
        }, {
            question_text: 'What is another term for "fool"?',
            options: ['college', 'idiot', 'professional', 'clerk'],
            answer: 1,
            bot_answer: 0
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

    setQuestion();
    var answer_clicked = false;

    function setQuestion() {
        answer_clicked =false;
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
                    window.location = 'download.html';
                }
            }, 2000);

        } else {
            answer_clicked = true;
        }


    });

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
      $($('.answer_options')[answerGiven]).addClass(sclass);

      $('#'+givenBy).addClass(profileClass);
      //playmusic
      //show img of opposite player
    }

});
