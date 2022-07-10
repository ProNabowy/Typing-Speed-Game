// Set What i wanna Do

// [1] ===========================================================>  Selector All elemnts From HTML 

// [2] ===========================================================>  Create Arrays To Set words for it

// [3] ===========================================================>  Create Object to Know Level Of Game

// [4] ===========================================================>  Create Function To Stup HTML Elements

// [5] ===========================================================>  Create Function To Set Correct Words

// [6] ===========================================================>  Create Random Function To Select Random Word

// [7] ===========================================================>  Create Function to add words in page

// [8] ===========================================================>  Create Function to Run time For Game

// [9] ===========================================================>  Create event to call Function when user click on Start Play

// [10] ==========================================================>  Create Function To add data To LocalStorage

const select = document.querySelector("select");

const gameLevel = document.querySelector(".lvl-game");

const gameSeconds = document.querySelector(".lvl-sconds");

const word = document.querySelector(".word");

const btn = document.querySelector(".start");

const input = document.querySelector("input");

const words = document.querySelector(".words");

const timeLeft = document.querySelector(".time-sec");

const score = document.querySelector(".score-num");

const scoreFrom = document.querySelector(".arr-leng");

const good = document.querySelector(".good");

const bad = document.querySelector(".bad");

const again = document.querySelector(".again");

// [2] ===========================================================>  Create Arrays To Set words for it

const arrOfWords = [
    "necessary",
    "impressive",
    "extremely",
    "credentials",
    "embarrassed",
    "dimensions",
    "significant",
    "dashboard",
    "personalized",
    "responses",
    "increasingly",
    "occupying",
    "redundant",
    "introduced",
    "structured",
    "Prerequisites",
    "inevitable",
    "Objective",
    "familiarity",
    "constructs",
    "providing",
    "differentiate",
    "introduced",
    "dwellings",
    "appliance",
    "inefficient",
    "hypothesis",
    "encrypted",
    "particular",
    "characteristic"
];
const easy = [

    "encrypted",
    "transmit",
    "literacy",
    "Objective",
    "appliance",
    "providing",
    "mentioned",
    "Capitalism",
    "stealing",
    "important",
    "rushed",
    "inside",
    "something",
    "happens",
    "peaceful",
    "history",
    "Problem",
    "actually",
    "people",
    "schoold",
];

const noraml = [

    "rather",
    "attempt",
    "syntax",
    "organic",
    "engage",
    "revamp",
    "signify",
    "junior",
    "guru",
    "query",
    "latest",
    "Newbie",
    "retrieve",
    "lower",
    "actually",
    "useful",
    "built",
    "organic",
    "period",
    "history",

];

// [3] ===========================================================>  Create Object to Know Level Of Game

const obj = {
    "Noraml" : 6,
    "Easy": 4,
    "Hard": 3
};

// Create Function To Stup HTML Elements

function innerHt() {


    const level = select.value;

    const selectLevel = obj[level];

    gameLevel.innerHTML = level;

    gameSeconds.innerHTML = selectLevel;

    timeLeft.innerHTML = selectLevel;

    score.innerHTML = 0;


    if(select.value === "Noraml") scoreFrom.innerHTML = noraml.length;

    if(select.value === "Easy") scoreFrom.innerHTML = easy.length;

    if(select.value === "Hard") scoreFrom.innerHTML = arrOfWords.length;

}


innerHt();

// Calling Function When User Select option From Box

select.addEventListener("click", innerHt);

// Create Function To Set Correct Words

function getLevel(level) {

    const randomWords = level[Math.trunc(Math.random() * level.length)];

    const wordHardIndex = level.indexOf(randomWords);

    // Delete Word From Array To Add Array To Page

    // add word to inner HTML 

    word.innerHTML = randomWords;


    level.splice(wordHardIndex , 1);



} 

// [4] ===========================================================>  Create Random Function To Select Random Word

function randomWord() {

    if(select.value === "Hard") getLevel(arrOfWords);

    if(select.value === "Easy") getLevel(easy);

    if(select.value === "Noraml") getLevel(noraml);

    // You Should To emepty Wrods div Before To Call Function to add it to page

    words.innerHTML = '';

    if(select.value === "Noraml") addWordsToPage(noraml);

    if(select.value === "Hard") addWordsToPage(arrOfWords);

    if(select.value === "Easy") addWordsToPage(easy);

    play();

};

// [5] ===========================================================>  Create Function to add words in page

function addWordsToPage(value) {

    for (let i = 0; i < value.length; i++) {

        // Create Span to add word for it

        const span = document.createElement("span");
        
        span.innerHTML = value[i];

        // append Span To Parent Div 

        words.appendChild(span);

    }

}

// [6] ===========================================================>  Create Function to Run time For Game

function play() {

    input.value = '';

    const level = select.value;

    const selectLevel = obj[level];

    timeLeft.innerHTML = selectLevel;

    const start = setInterval(() => {
        
        timeLeft.innerHTML--

        if(timeLeft.innerHTML == "0") {

            clearInterval(start);

            if(input.value.toLowerCase() === word.innerHTML.toLowerCase()) {

                if(arrOfWords.length > 0 && noraml.length > 0 && easy.length > 0) {
                    
                    randomWord();
                    
                    score.innerHTML++;
                    
                }else {

                    good.style.cssText += "display:block";

                    score.innerHTML = 20;

                    again.style.cssText += "display:block";

                    clickToPlayAgain();

                }

            }else {

                bad.style.cssText += "display:block";

                input.blur();

                again.style.cssText += "display:block";

                clickToPlayAgain();

            };

        };

                    // Calling Function To Add Score To LocalStorage

                    LocalStor();

    }, 1000);

}

// Create event to call Function when user click on Start Play

btn.addEventListener("click" , function() {

    btn.remove();

    input.focus();

    randomWord();

    // add Condation to help user if him play on hard lvl

    if(select.value === "Hard") timeLeft.innerHTML = 6;

    // Hide Select to Prevent  user from accessing it

    select.remove();

});

// Covarte Input to make user don't able to paste words at filled

input.onpaste = _ =>  false;

// Add event when user want to play again

again.addEventListener("click" , _ => window.location.reload());

// Create Function To add data To LocalStorage

function LocalStor() {

    let date = new Date().getDay();

    const arrOfDays = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday" ];

    localStorage.setItem("day & Score" , `day is ${arrOfDays[date]} & Your Last Score is ${score.innerHTML}`);

};

// Create Function To Set Data From LocalStorage

function setDateToBody() {

    const div = document.createElement("div");

    div.classList = "localStroage";

    div.innerHTML = localStorage.getItem("day & Score");

    // append div to body 

    document.body.appendChild(div);

};

// Check if LocalStorage Have date Or Not

if(localStorage.getItem("day & Score")) setDateToBody();

// Convert Play Again when user click enter

function clickToPlayAgain() {

    window.addEventListener("keyup" , function(e) {

        if(e.key === "Enter") again.click();

    });
    
};

// Create Function To Click on button  to play 

function clickBtn() {

    this.addEventListener("keyup" , function(e) {

        if(e.key === "Enter") btn.click();

    });

};

// Calling Function To Convert Click To Enter Key

clickBtn();
