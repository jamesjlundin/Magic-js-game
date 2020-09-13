const type = document.querySelector(".typing");
const animate =document.querySelector(".hiders p");
const inputCon =document.querySelector(".input-container");
const BackBtn =document.querySelector(".BackBtn");
const audioId = document.querySelector("#audio-id");
const magician = document.querySelector(".magician")
const AudioItems = [
  {
  id : 0,
  src:"./media/2019-05-01_-_Undercover_Spy_Agent_-_David_Fesliyan.mp3",
},
  {
  id : 1,
  src:"./media/Magic-Spell-A-Long-www.fesliyanstudios.com.mp3",
},
  {
  id : 2,
  src:"./media/2017-03-16_-_Edge_of_Conspiracy_-_David_Fesliyan.mp3",
},
  {
  id : 3,
  src:"./media/2019-06-17_-_Super_Spiffy_-_David_Fesliyan.mp3",
},
  {
  id : 4,
  src:"./media/2020-07-05_-_Dragon_Boss_Fight_-_David_Fesliyan.mp3",
},
  {
  id : 5,
  src:"./media/2016-11-20_-_Anticipation_-_David_Fesliyan.mp3",
}
];
const MagicianImg = [
  {
    id : 0,
    src : "./media/magician-beared-svg.svg"
},
  {
    id : 1,
    src : "./media/magic-celebreate-svg.svg"
}
];
window.addEventListener("DOMContentLoaded", ()=>{
  audioId.setAttribute("src", AudioItems[5].src);
  magician.setAttribute("src", MagicianImg[0].src);
  audioId.play();
  audioId.loop = true;
 
  if(sessionStorage.getItem("isFirst") === null) 
    alert("This game will be more interesting if you allow Autoplay for this page \n you can allow it from site setting or from url tab ");

    sessionStorage.setItem("isFirst", "true");
});


setTimeout(()=>{
  if(sessionStorage.getItem("name") === null){
 let newInput=  document.createElement("input");
 let newBtn=  document.createElement("input");
 newInput.setAttribute("placeholder" , "Name");
 newInput.setAttribute("class" , "input");
 newInput.setAttribute("type" , "text");
  inputCon.appendChild(newInput);
  newBtn.setAttribute("type" , "button");
  newBtn.setAttribute("value" , "Ok");
  newBtn.setAttribute("class" , "btn");
  inputCon.appendChild(newBtn);

  //event 
  newBtn.addEventListener("click", ()=>{
    const User_name = newInput.value;
    audioId.play();
    sessionStorage.setItem("name" , User_name);
    setTimeout(()=>{
      newInput.style.display = `none`;
      newBtn.style.display = `none`;
      type.innerHTML =``;
      getUserName();
    },1500)
  });
} else  return getUserName();
},12000);

function getUserName() {
  console.log(sessionStorage.getItem("name"));
  let User_name = sessionStorage.getItem("name");
  User_name.toUpperCase();
  User_name.fontcolor = `#eb8686`;
  type.innerHTML =  `Welcome, Mr ${User_name}<br>
  here is the game rule......`;
  // next-btn
  let next = document.createElement("input");
  next.setAttribute("type" , "button");
  next.setAttribute("class" , "btn");
  next.setAttribute("value" , "I get it!");
  inputCon.appendChild(next);


  next.addEventListener("click",()=>{
  setTimeout(()=>{
    next.remove();
    type.innerHTML =  `let's began the game. <br>
    give me the nubmer and I will tell you the missed number.
    Are you ready, ${User_name}?`; 
    const Btn = [
       document.createElement("input") ,
       document.createElement("input")
    ];
    Btn[0].setAttribute("value" , "Yes, I'm Ready👍");
    Btn[1].setAttribute("value" , "No, I'm confused😕");
 Btn.forEach(btn => {
     inputCon.appendChild(btn);
     btn.setAttribute("class" , "boolean-btn");
     btn.setAttribute("type" , "button");

      btn.addEventListener("click",(e)=>{
        if(e.currentTarget === Btn[0]){
          fireGame();
        } 
        else if(e.currentTarget === Btn[1]) {
           getUserName();
        }
        Btn.forEach(item=> {
          item.remove();
          item.removeAttribute("class")
        });
      });
    })
  },1000);
});
}

function fireGame(){
  console.log("fire");
  type.innerHTML = `Me too! Here we go. <br> Let's do this,<br>`

  let form = document.createElement("form");
  let numInput = document.createElement("input");
  let submitBtn = document.createElement("input");
  let demo = document.createElement("p");
      demo.setAttribute("id", "demo");

  //input text attributes 
  numInput.setAttribute("type", "number");
  numInput.setAttribute("id", "input-number");
  numInput.setAttribute("placeholder", "only Integers");
  // input btn attributes 
  submitBtn.setAttribute("type", "button");
  submitBtn.setAttribute("class", "btn");
  submitBtn.setAttribute("value", "Submit");
  form.appendChild(numInput);
  form.appendChild(submitBtn);
  form.appendChild(demo);

  inputCon.appendChild(form);

  // reset Btn
  let resetBtn = document.createElement("input");
    resetBtn.setAttribute("class", "resetbtn btn");
    resetBtn.setAttribute("type", "button");
    resetBtn.setAttribute("value", "Reset");
    BackBtn.appendChild(resetBtn);
    resetBtn.onclick = ()=>{
      let reset = confirm("you will be asked your name again!");
      if(reset == true){
        return backToDefault();
      }
    }
  
  //  core code
  submitBtn.addEventListener('click',(copyNum)=>{
    demo.textContent = `Thinking...🤔💭`;
    setTimeout(()=>{
    audioId.pause();
    audioId.setAttribute("src", AudioItems[1].src);
    audioId.loop = false;
      let number = numInput.value;
    number = parseFloat(number);
    console.log(number);
    copyNum = number ; 
    if(number !== Math.floor(number)){ 
      console.error("no decimal");
      demo.textContent = `decimals, texts or symbols are not accepted! only  Z(integer).`;
   }
    else {
     for( let i=0; i < 9; i++ ){
       if(copyNum % 9 === 0){
         console.log('==> ' +copyNum);
         let missedNum = copyNum - number;
         console.log('missed number = ' + missedNum);
         magician.setAttribute("src", MagicianImg[1].src);
         type.innerHTML = `Here it is! 😎🆒🤓`;
         return demo.textContent = 'The Missed Number is ' + missedNum+'.';
       }
       copyNum++;
     }
  }
    },2000) 
  });
}

function backToDefault() {
  sessionStorage.removeItem("name");
  window.location.reload();
}

// style core code 
// svg replacement
// make restart button
// audio
// animation 