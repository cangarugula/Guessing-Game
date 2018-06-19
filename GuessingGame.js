function generateWinningNumber(){
    let randomNum = Math.random()
    if(randomNum * 100 === 0){
        return 1
    } else {
        return Math.ceil(randomNum * 100)
    }
}

function shuffle(array){
    let totalNum = array.length; 
    let tempNum = 0;
    let i = 0;
    while(totalNum){
        i = Math.floor(Math.random() * totalNum--)
        tempNum = array[totalNum]
        array[totalNum] = array[i]
        array[i] = tempNum
    }
    return array

}

function Game(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber()
}


Game.prototype.difference = function(){
    return Math.abs(this.winningNumber - this.playersGuess)
}

Game.prototype.isLower = function(){
    if(this.playersGuess < this.winningNumber){
        return true
    } else {
        return false
    }
}
Game.prototype.checkGuess = function(){
    console.log('this is past guesses: ',this.pastGuesses)
    
    let totalGuesses = this.pastGuesses.length
    
    if(this.playersGuess === this.winningNumber && totalGuesses <= 4){
        return "You Win!"
    } 
    if(this.pastGuesses.indexOf(this.playersGuess) > -1){
        return "You have already guessed that number."
    } 
    this.pastGuesses.push(this.playersGuess)
    console.log(totalGuesses)
        if(this.playersGuess !== this.winningNumber && totalGuesses === 4){
            return "You Lose."
        } else {
            
            if(Math.abs(this.playersGuess - this.winningNumber) < 10){
                return "You're burning up!"
            }
            if(Math.abs(this.playersGuess - this.winningNumber) < 25){
                return "You're lukewarm."
            }
            if(Math.abs(this.playersGuess - this.winningNumber) < 50){
                return "You're a bit chilly."
            }
            if(Math.abs(this.playersGuess - this.winningNumber) < 100){
                return "You're ice cold!"
            }
        }
    

}





Game.prototype.playersGuessSubmission = function(num){
    this.playersGuess = num
    // this.pastGuesses.push(this.playersGuess)
    if(num <= 0 || num > 100 || typeof num !== 'number'){
        throw("That is an invalid guess.")
    } else {
        // this.pastGuesses.push(this.playersGuess)
        return this.checkGuess()
    }
}

Game.prototype.provideHint = function(){
    return shuffle([this.winningNumber,generateWinningNumber(),generateWinningNumber()])
}

function newGame(){
    return new Game()
}



$(document).ready(function(){
  $("button").on("click",function(event){
      let submission = $("input").val();
      $("guess1")
      
  })
 })
