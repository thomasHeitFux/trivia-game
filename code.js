const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const next_btn = quiz_box.querySelector(".next_btn");
const total_que = quiz_box.querySelector(".total_que");
const que_text = document.querySelector(".que_text");
const option_list = document.querySelector(".option_list");
const tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
const crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>'
const timerCount =  quiz_box.querySelector(".timer .timer_sec")
const timerLine = quiz_box.querySelector(".header .time_line");







start_btn.onclick = ()=>{
    info_box.classList.add("activeinfo");
}

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeinfo");
}

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeinfo");
    quiz_box.classList.add("activequiz");
    showQuestions(0);
    startTime(timerValue);
    startTimeLine(0)
}

let widthValue = 0;
let que_count = 0;
let counter;
let timerValue= 15;


next_btn.onclick = ()=>{
    if (que_count < questions.length) {
        que_count++;
        clearInterval(counter);
        startTime(timerValue);
        showQuestions(que_count);
        clearInterval(counterLine);
        startTimeLine(widthValue);
        total_que.innerHTML = `<span><p>${que_count+1}</p>of<p>5</p>Questions</span>`;
    }else{
        console.log("Questions complete")
    }
}

function showQuestions(index){
    let que_tag = `<span> ${questions[index].numb}${questions[index].question}</span>`
    let option_tag =`<div class="option"><span>${questions[index].options[0]}</span></div>`
                    +`<div class="option"><span>${questions[index].options[1]}</span></div>`
                    +`<div class="option"><span>${questions[index].options[2]}</span></div>`
                    +`<div class="option"><span>${questions[index].options[3]}</span></div>`
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;


    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}

function optionSelected(answer) {
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    clearInterval(counter);
    if (userAns == correctAns) {
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend",tickIcon);
        console.log("Answer is correct.");
    }else{
        answer.classList.add("incorrect")
        answer.insertAdjacentHTML("beforeend",crossIcon);
        console.log("Answer is wrong.")

        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class","option correct")
                option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
            }
        }
    }
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
        
    }
}


function startTime(time) {
    counter = setInterval(timer,1000);
    function timer() {
        timerCount.textContent = time;
        time--;
        if (time<9) {
            let addZero = timerCount.textContent;
            timerCount.textContent = "0"+addZero;
        }
        if (time <0) {
            clearInterval(counter);
            timerCount.textContent = "00"
        }
    }
}



function startTimeLine(time) {
    counterLine = setInterval(timer,29);
    function timer() {
        time += 1;
        timerLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}

