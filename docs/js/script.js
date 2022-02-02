// constraints/variables
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// if startQuiz button is clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); // show info box
}

// if exitQuiz button is clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); // hide info box
}

// if continueQuiz button is clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); // hide info box
    quiz_box.classList.add("activeQuiz"); // show quiz box
    showQuestions(0); // call showQuestions function
    queCounter(1); // passing 1 parameter to queCounter
    startTimer(60); // call startTimer function
    startTimerLine(0); // call startTimerLine function
}

let timeValue =  60;
let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let widthValue = 0;
let finished = false;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button is clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); // show quiz box
    result_box.classList.remove("activeResult"); // hide result box
    timeValue = 60; 
    que_count = 0;
    que_numb = 1;
    widthValue = 0;
    finished = false;
    showQuestions(que_count); // call showQuestions function
    queCounter(que_numb); // pass que_numb value to queCounter
    clearInterval(counter); // clear counter
    clearInterval(counterLine); // clear counterLine
    startTimer(); // call startTimer function
    startTimerLine(); // call startTimerLine function
    timeText.textContent = "Time Left"; // change text of timeText to Time Left
    next_btn.classList.remove("show"); // hide the nextQuestion button
}

// if quitQuiz button is clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); // reload window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if nextQuestion button is clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ // if question count is less than total question length
        que_count++; // increment que_count value
        que_numb++; // increment que_numb value
        showQuestions(que_count); // call showQuestions function
        queCounter(que_numb); // pass que_numb value to queCounter
        timeText.textContent = "Time Left"; // change text of timeText to Time Left
        next_btn.classList.remove("show"); // hide the nextQuestion button
    }else{
        clearInterval(counter); // clear counter
        clearInterval(counterLine); // clear counterLine
        showResult(); // call showResult function
    }
}

// get questions/options from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");

    // create new span and div tag for question/option and pass the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; // add new span tag inside que_tag
    option_list.innerHTML = option_tag; // add new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// create new div tags for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// if user clicked option
function optionSelected(answer){
    let userAns = answer.textContent; // get user selected option
    let correctAns = questions[que_count].answer; // get correct answer from array
    const allOptions = option_list.children.length; // get all option items
    
    if(userAns == correctAns){ // if user selected option is equal to array's correct answer
        answer.classList.add("correct"); // add green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); // add tick icon to correct selected option
        console.log("Correct Answer");
        // console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); // add red color to incorrect selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); // add cross icon to incorrect selected option
        console.log("Wrong Answer");
        timeValue -= 6;

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correctAns){ // if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); // add green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // add tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); // once user selects an option then disable all options
    }
    next_btn.classList.add("show"); // show next button if user selected any option
}

function showResult(){
    info_box.classList.remove("activeInfo"); // hide info box
    quiz_box.classList.remove("activeQuiz"); // hide quiz box
    result_box.classList.add("activeResult"); // show result box
    const scoreText = result_box.querySelector(".score_text");
    let scoreTag = '<span>You finished with ' + timeValue + ' seconds left<span>'
    scoreText.innerHTML = scoreTag;
    scoreText.innerHTML += "<input id='textfield' type='text' />";
    console.log('document.getElementById: ', document.getElementById('submit'));
    document.getElementById('submit').addEventListener('click', storeResult);
    return;
    

    // get user's initials (event listener)
    // input validation for intials on button listener 
    // add text box
    // execute function to put initials and timevalue in localstorage
    // display localstorage inputs
    // reset quiz

//     // if (userScore > 3){ // if user scored more than 3
//         // create new span tag and pass the user score number and total question number
//         let scoreTag = '<span>Awesome! You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
//         scoreText.innerHTML = scoreTag;  // add new span tag inside score_Text
//     }
//     // else if(userScore > 1){ // if user scored more than 1
//         let scoreTag = '<span>You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
//         scoreText.innerHTML = scoreTag;
//     }
//     // else{ // if user scored 1 or less
//         let scoreTag = '<span>Oof. You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
//         scoreText.innerHTML = scoreTag;
//     }
};

function storeResult() {
    var storage = window.localStorage;
    var initials = document.getElementById('textfield').value;
    storage.setItem(initials, timeValue);

    var curr_ids = new Map(JSON.parse(storage.getItem("ids")));
    if (curr_ids === null) {
        curr_ids = new Map();
    }
    curr_ids.set(initials, timeValue);
    storage.setItem("ids", JSON.stringify([...curr_ids]));
    curr_ids = new Map(JSON.parse(storage.getItem("ids")));
    // console.log(curr_ids);
    curr_ids.forEach((val, key) => {
        console.log(key + ": " + val);
    });
};

function startTimer(){
    counter = setInterval(timer, 1000);
    function timer(){
        if (!finished) {
            timeCount.textContent = timeValue; // change value of timeCount with time value
        timeValue--; // decrement time value
        if(timeValue < 9){ // if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; // add a 0 before time value
        }
        if(timeValue <= 0){ // if timer is less than 0
            timeValue = 0;
            finished = true;
            showResult();
            return 0;
        }
        }
}
}

function startTimerLine(){
    counterLine = setInterval(timer, 111);
    function timer(){
        // time += 1; // upgrading time value with 1
        // time_line.style.width = time + "px"; // increase width of time_line with px by time value
    }
}

function queCounter(index){
    // create new span tag and pass the question number and total questions
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  // add new span tag inside bottom_ques_counter
}