document.addEventListener('DOMContentLoaded', () => {
   
    let resetButton=document.querySelector('.resetbtn');
    let historytext=document.querySelector(".historyDisplay");
    let playerName=document.querySelector("#playername");
    const displayScore1 = document.querySelector('#score1');
    const displayScore2 = document.querySelector('#score2'); 
    const cards=document.querySelectorAll(".images");

    let firstSelection="";
    let secondSelection="";
    let firstCard=false;
    let playerTurn=true;
    let score1=0;
    let score2=0;
    let matchingCards=0;

    playerName.innerHTML= `Player: ${localStorage.getItem("textvalue")}'s turn`;
    document.querySelector("#playerscore1").innerHTML = ` ${localStorage.getItem("textvalue")} :`;
    document.querySelector("#playerscore2").innerHTML = ` ${localStorage.getItem("textvalue1")} :`;
    
    cards.forEach(card=>card.addEventListener('click',flipcard));
    shuffleCards();

    function shuffleCards(){
        cards.forEach(card=>{
            let randomIndex=Math.floor(Math.random()*24);
            card.style.order=randomIndex;
        });
    }

    function flipcard(){

        if(this===firstSelection) return;
        this.classList.add("clicked");

        if(!firstCard){
            firstCard=true;
            firstSelection=this;
            return; 
        }   
        firstCard=false;
        secondSelection=this;
        checkMatch();
    }

    function checkMatch(){
        if(firstSelection.getAttribute("character") === secondSelection.getAttribute("character")){ 

            firstSelection.classList.add("checked"); 
            firstSelection.classList.remove("clicked");
            secondSelection.classList.add("checked");
            secondSelection.classList.remove("clicked");
            matchingCards++;

            firstSelection.removeEventListener('click',flipcard);
            secondSelection.removeEventListener('click',flipcard); 

            setTimeout(()=>{     
                firstSelection.classList.remove("checked"); 
                secondSelection.classList.remove("checked");  
                firstSelection.classList.add("remove");
                secondSelection.classList.add("remove"); 
            },800);

            if(playerTurn) {
                score1+=2;
                displayScore1.textContent=score1.toString();
                historytext.innerText+=`${localStorage.getItem("textvalue")} found ${firstSelection.getAttribute("character")+'\n'}`; 
            }else{
                score2+=2;
                displayScore2.textContent=score2.toString();
                historytext.innerText+=`${localStorage.getItem("textvalue1")} found ${firstSelection.getAttribute("character")+'\n'}` 
            }

            if(matchingCards==12){
                if(score1>score2){
                    historytext.innerText=`Congratulation!!! ${localStorage.getItem("textvalue")}  Win's the Chipmunks`;
                    alert(`Congratulation!!! ${localStorage.getItem("textvalue")}  Win's the Chipmunks`);
                } else if(score1===score2){
                    historytext.innerText=`Congratulation!!! You Both Win the Game.`;
                    alert(`Congratulation!!! You Both Win the Game.`);
                }else{
                    historytext.innerText=`Congratulation!!! ${localStorage.getItem("textvalue1")}  Win's the Chipmunks`;
                    alert(`Congratulation!!! ${localStorage.getItem("textvalue1")}  Win's the Chipmunks`);
                }
            }
        }else{
            
            firstSelection.classList.add("change");
            secondSelection.classList.add("change");

            setTimeout(() => {
                firstSelection.classList.remove("change");
                firstSelection.classList.remove("clicked");
                secondSelection.classList.remove("change");
                secondSelection.classList.remove("clicked");
            }, 800);

            if(playerTurn){
                playerTurn=false;
                playerName.innerHTML= `Player: ${localStorage.getItem("textvalue1")}'s turn`;
            }
            else if(!playerTurn){
                playerTurn=true;
                playerName.innerHTML= `Player: ${localStorage.getItem("textvalue")}'s turn`; 
            }
        }
    }

    resetButton.addEventListener('click',event=>{
        cards.forEach(card=>{
            card.classList.remove("clicked");
            card.classList.remove("remove");
            card.addEventListener('click',flipcard);
            score1=0;
            score2=0;
            displayScore1.textContent='';
            displayScore2.textContent=''; 
            historytext.innerText=''; 
            matchingCards=0;
        });
        shuffleCards();                  
    });
});
