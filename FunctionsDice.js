let winner;
let bet[];
let priceOnBet[];
let maxSide;

let  streak;
let gameId;
//const One = One,1 : Two = Two,2 :Three = Three,3:Four=Four,4,Five=Five,5:Six = Six,6;
 
let stage;
let time;
while(true){
    startGame();
    acceptBetting();
    winnerCalculation();
    showResult();
}

function startGame(){
    stage = 0;
    bet[1-6] = 0;
    priceOnBet[1-6] =  getRndInteger(200,50000)*6;
}
function acceptBetting(amt,side,userid){
    stage = 1;
     //deduct amt from userid wallet
    bet[side],priceOnBet[side] += amt;

}
function winnerCalculation(){
    stage = 2;
maxSide = bet[1-6].max();
    //10sec total===
    winner = getWinner();
}
function showResult(){
    stage = 3;
    updateStreak();
    rewardWinners();
    return winner;
    
}
function updateStreak(){
    //update streak;
    //push new ui update
}
function rewardWinners(){
    //get amt,userId from trans_table where gameid=gameId && side=winner;
    //update wallet_balance = amt*2, where userid = userId; 
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getWinner(){
    if getRndInteger(1, 6) != maxside ? return result : getWinner();
}

