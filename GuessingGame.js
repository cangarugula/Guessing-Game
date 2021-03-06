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
                return "Almost to the center!"
            }
            if(Math.abs(this.playersGuess - this.winningNumber) < 25){
                return "You're getting there"
            }
            if(Math.abs(this.playersGuess - this.winningNumber) < 50){
                return "You have many licks ahead of you"
            }
            if(Math.abs(this.playersGuess - this.winningNumber) < 100){
                return "You're just licking the wrapper"
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



$(document).ready(function() { console.log('hello') });

let game = new Game()

let logSubmission = function(){
    let submission = Number($("input").val())
    let outcome = game.playersGuessSubmission(submission)
    if(outcome === 'You have already guessed that number.'){
        $("#title").text("Guess Again!")
    } else if(outcome === "You Lose." || outcome === "You Win!"){
        $("#title").text(outcome)
        $("#subtitle").text("Reset the game and play again!")
        $("#submit").prop('disabled',true)
        $("#hint").prop('disabled',true)
    } else {
        $("#title").text(outcome)
        if(game.isLower()){
            $("#subtitle").text("You need more licks than that!")
        } else {
            $("#subtitle").text("The lollipop's not that big")
        }
    }

    let guessList = document.body.getElementsByClassName("guess")
    for(let i = 0; i < game.pastGuesses.length; i++){
        $(guessList[i]).text(game.pastGuesses[i])
    }
    $("input").val("")
}

$("#reset").on("click",function resetGame(){
    game = new Game()
    $("#title").text("Journey to the Center of a Lollipop")
    $("#subtitle").text("Guess how many licks it takes to get to the center!")
    $("li").text("-")
    $("#submit").prop('disabled',false)
    $("#hint").prop('disabled',false)
})

$("#hint").on("click",function getHints(){
    $("#title").text("The winning numbers are " + game.provideHint().join(", "))

})

$("#submit").on("click",function(){
    if($("#submit").prop('disabled') !== true){
        logSubmission()
    }
})
$("#input-box").keypress(function(event){
    if(event.keyCode == "13" && $("#submit").prop('disabled') !== true){
        logSubmission()
    }
})