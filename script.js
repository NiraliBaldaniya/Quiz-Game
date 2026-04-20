let currentindex = 0;
let timer;
let time = 15;
let score = 0;

const btn = document.getElementById("startbtn");
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const exitbtn = document.getElementById("exitbtn");
const startquizbtn = document.getElementById("startquizbtn");
const nextBtn = document.getElementById("nextBtn");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");
const progressLine = document.getElementById("progress-line");
let username = "";


btn.addEventListener("click", () => {
 
  let user = document.getElementById("username");
  let alerttext = document.getElementById("alert");
  

  if(user.value.trim() === ""){
    alerttext.innerHTML= "Enter your name";
    return;
  }

   alerttext.innerHTML = "";
   username = user.value;


  setTimeout(() => {
  box1.style.display = "none";
  box2.classList.add("show");
}, 300);
});

exitbtn.addEventListener("click", ()=>{
    box2.classList.remove("show");
    box1.style.display= "block";
    score = 0;
    currentindex = 0;
    time = 15;
    progressLine.style.width = "0%";
    document.getElementById("username").value = "";
})


startquizbtn.addEventListener("click", () => {
    box2.classList.remove("show"); 
    box3.classList.add("show"); 
    currentindex = 0;
    loadquestion();
});
function loadquestion(){
    clearInterval(timer);
    nextBtn.style.display = "none";
    let q = questions[currentindex];

questionEl.innerText = q.question;
progressEl.innerText = `Questions ${currentindex+1} of ${questions.length} `;

optionsEl.innerHTML = "";

q.options.forEach(opt => {
let btn = document.createElement("button");
btn.innerText = opt;

btn.onclick = () => selectAnswer(btn, q.answer);

optionsEl.appendChild(btn);
});

startTimer(q.answer);
}


function startTimer(correct){
time = 15;
progressLine.style.width = "0%";

timer = setInterval(() => {
time--;

progressLine.style.width = ((15-time)/15)*100 + "%";

if(time <= 0){
clearInterval(timer);
disable(correct);
}
},1000);
}


function selectAnswer(btn, correct){

clearInterval(timer);

let all = document.querySelectorAll("#options button");

all.forEach(b => b.disabled = true);

if(btn.innerText === correct){
btn.classList.add("correct");
score++;
}else{
btn.classList.add("wrong");

all.forEach(b=>{
if(b.innerText === correct){
b.classList.add("correct");
}
});
}

nextBtn.style.display = "block";
}


function disable(correct){

let all = document.querySelectorAll("#options button");

all.forEach(b => b.disabled = true);

all.forEach(b=>{
if(b.innerText === correct){
b.classList.add("correct");
}
});
setTimeout(()=>{
    currentindex++;

    if(currentindex < questions.length){
        loadquestion();
    }
    else{
        showResult();
    }

},1500)

nextBtn.style.display = "block";
}


nextBtn.onclick = () => {
currentindex++;

if(currentindex < questions.length){
loadquestion();
}
else{
    showResult();
}
};
function showResult(){


    box3.classList.remove("show")
    document.querySelector(".result_box").style.display = "block";
     let message = "";

    if(score === questions.length){
        message = "🏆 Perfect! Amazing performance!";
    }
    else if(score >= questions.length/2){
        message = "😎 Excellent!";
    }
    else{
        message = "👍 Try again!";
    }
  
    document.getElementById("finaltext").innerHTML =
    `<b>${username}</b>! ${message}<br>
    You scored <b>${score}/${questions.length}</b>`;
}

const quitBtn = document.getElementById("quitquiz");

quitBtn.addEventListener("click", () => {

    
    score = 0;
    currentindex = 0;
    time = 15;
    clearInterval(timer);


    box3.classList.remove("show");
    box2.classList.remove("show");

    document.querySelector(".result_box").style.display = "none";


    box1.style.display = "block";
    
    document.getElementById("username").value = "";
    progressLine.style.width = "0%";

    document.getElementById("options").style.display = "block";
    document.querySelector(".quiz-header").style.display = "flex";
    document.querySelector(".progress-bar").style.display = "block";
    document.getElementById("progress").style.display = "block";
});
const replayBtn = document.getElementById("resetquiz");

replayBtn.addEventListener("click", () => {

    score = 0;
    currentindex = 0;
    time = 15;
    clearInterval(timer);

    document.querySelector(".result_box").style.display = "none";

    box3.classList.add("show");
    box2.classList.remove("show");

    progressLine.style.width = "0%";

    loadquestion();
});