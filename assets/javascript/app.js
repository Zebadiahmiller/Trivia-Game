
//event listeners
$(document).ready(function(){
  
    
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startgame);
    $(document).on('click' , '.option', trivia.answerCheck);
    console.log(startgame)
  })




//questions variable



const trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId: '',
    questions: {
        q1: "Who made the One Ring?",
        q2: "What race is Gandalf?",
        q3: "What is Gollum's real name?",
        q4: "What is the name of Gandalf's sword?",
        q5: "Who is Arwen's father?",
        q6: "You can not simply walk where?",

    },
    choices: {
        q1: ["Sauron", "Gandalf", "Melkor", "Morgoth"],
        q2: [ "Illuvial","Ainur", "Elvish", "Human"],
        q3: [ "Delwin", "Drogo", "Smeagol","Gaffer"],
        q4: [ "Sting", "Anduril", "Orcrist","Glamdring",],
        q5: ["Elrond", "Glorfindel", "Thranduil", "Celeborn"],
        q6: [ "The Shire","Mordor", "Mirkwood", "Rohan"],


    },
    answers: {
        q1: "Sauron",
        q2: "Ainur",
        q3: "Smeagol",
        q4: "Glamdring",
        q5: "Elrond",
        q6: "Mordor",
    },
    //resetting the game and variables
    startgame: function () {

        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);
        
                trivia.whichQuestion();
        //showing the trivia 
        $(".trivia").show();
        $('#game').show();

        //  empty last results
        $('#results').html('');

        // show timer
        $('#timer').text(trivia.timer);

        // remove start button
        $('#start').hide();

        $('#remaining-time').show();

        



    },

    //picking the question
    whichQuestion: function () {
        trivia.timer = 10;
        $("#timer").removeClass("last-seconds")
        $("#timer").text(trivia.timer);
        

        //keeping the timer from speeding up
        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerStarted, 1000);
        };
        console.log("question number" + trivia.currentSet)
        console.log(trivia.questions)
        //gathering questions and their current indexes
        var questionText = Object.values(trivia.questions)[trivia.currentSet];
        $("#question").text(questionText);
        console.log(questionText);



        //accessing the array of options
        var questionChoices = Object.values(trivia.choices)[trivia.currentSet];
        $("#options").empty(); 

        //displaying questions to html
        $.each(questionChoices, function (index, key) {
            $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
        });
        console.log(questionChoices)



    },

    // method to decrement counter and count unanswered if timer runs out
    timerStarted: function () {

        console.log("inside timer started function" + trivia.currentSet);
        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            
            $("#timer").text(trivia.timer);
            
            trivia.timer--;

            if (trivia.timer === 4) {
                $("#timer").addClass("last-seconds");
                console.log(trivia.timer)
            }
        }
        //when timer runs out adding how many were incorrect
        else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.answerResult, 1000);
            $("#results").html("<h1> Sauron has defeated you! Correct answer was:" + Object.values(trivia.answers[trivia.currentSet]) + "</h1>");
        }
        else if (trivia.currentSet === Object.keys(trivia.questions).length) {

            $("#results")
                .html("<h1> How did you fare against Sauron?</h1>" +
                    "<p>Correct: " + trivia.correct + "</p>" +
                    "<p>Incorrect: " + trivia.incorrect + "</p>" +
                    "<p>Unaswered: " + trivia.unanswered + "</p>" +
                    "<p>Please play again!</p>");
            $("#game").hide();

            $("#start").show();
            
            
        }
    },
//checking which button was clicked and if it right or not
    answerCheck: function(){
        // variable for results and timer
        var resultId;

        //variable for current question

        var currentQuestion = Object.values(trivia.answers)[trivia.currentSet];


        //if right adding to corrrect
        if($(this).text() === currentQuestion){
            //correct button turns to green
            $(this).addClass("btn-success").removeClass("btn-info");
            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.answerResult, 1000);
            $("#results").html("<h1>You anger Sauron with your correct answer!</h1>");
            console.log("this is me"+ resultId)
          }
          //if the user picks the wrong choice
          else {
              $(this).addClass("btn-danger").removeClass("btn-info");
              //adding to wrong if its wrong
              trivia.incorrect++;
              clearInterval(trivia.timerId);
              resultId = setTimeout(trivia.answerResult, 1000);
              //showing the results to the scree
              $("#results").html("<h1> Sauron beat you this time! Correct answer was: " + currentQuestion + " <h1>");
              console.log(trivia.answerResult)
          }

    },

    answerResult: function(){
        //going to next question
        trivia.currentSet++;
        //clearing screen
        $(".options").remove();
        $("#results h1").remove();
        //next question
        trivia.whichQuestion();
        
    }
  

};
// trivia.startgame();
// trivia.whichQuestion();
console.log(trivia);














