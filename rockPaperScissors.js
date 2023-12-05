
/**
 * Name: Sukhnain Deol
 * Purpose: This program takes in user input for their choice in a rock,paper,scissors game
 *          and randomly choses its own choice and communicates the result to the user through
 *          text on the webpage and allows a play-again option.
 */


var playerChoice = null; // global variable that holds player's move
var gameIsFinished = false; // used to check games state



// reads selected player move and plays rock, paper, scissors with user
function rockPaperScissors() 
{
    // return if no choice selected
    if (playerChoice == null) {return;}

    const moveChoice = ["rock", "paper", "scissors"];

    // moves are based on their index in choiceArray
    var computerChoice = Math.floor(Math.random() * 3);
    playerChoice = moveChoice.indexOf(playerChoice);

    // functions finds which move wins, alerts accordingly
    var winner = findWinner(playerChoice, computerChoice);
    alertWinner(winner, moveChoice[computerChoice]);
}



/**
 * returns a number to signify who won a game of rock paper scissors
 * 
 * @param {number} choiceOne - 0,1, or 2 representing rock, paper, scissors move
 * @param {number} choiceTwo - 0,1, or 2 representing rock, paper, scissors move
 * 
 * @returns {number} - returns -1 if choiceTwo wins, 0 for a tie, 1 if choiceOne wins
 */
function findWinner(choiceOne, choiceTwo)
{
    /**
     * returns a given result based on the value of choice
     * 
     * @param {number} choice - numerical value of the choice in rock paper scissors
     * @param {number} choiceOneResult - return value for case 0
     * @param {number} choiceTwoResult - return value for case 1
     * @param {number} choiceThreeResult - return value for case 2
     * 
     * @returns {number} - one of the 3 results according to the switch statement, otherwise null
     */
    function findChoiceWinner(choice, choiceOneResult, choiceTwoResult, choiceThreeResult) 
    {
        switch (choice)
        {
            case 0:
                return choiceOneResult;
            case 1:
                return choiceTwoResult;
            case 2:
                return choiceThreeResult;
            default:
                return null;
        } 
    }
      
    
    // call function based on which move was made by choiceTwo
    var winner;
    switch(choiceTwo) // computer's choice
    {
        case 0: // rock case
            // tie(0) if player=rock, playerWin(1) if paper, computerWin(-1) if scissors
            winner = findChoiceWinner(choiceOne, 0, 1, -1);
            break;
        case 1: // paper case
            winner = findChoiceWinner(choiceOne, -1, 0, 1);
            break;
        case 2: // scissors case
            winner = findChoiceWinner(choiceOne, 1, -1, 0);
            break;
        default:
            break;
    }
    return winner;
}



/**
 * uses player choice and computer choice to find what the text should be displayed
 * 
 * example: if player choice is rock and player choice is scissors
 *          return: "Rock breaks scissors."
 * 
 * @param {string} computerChoice - what move the computer chose
 * 
 * @param return - string of game result text
 */
function getWinnerText(computerChoice) 
{
    const moveChoice = ["rock", "paper", "scissors"];
    // get string values of each move
    let moves = [moveChoice[playerChoice], computerChoice];

    function hasMoves(moveOne, moveTwo) 
    {
        if (moves.includes(moveOne) && moves.includes(moveTwo))
        {
            return true;
        }
        return false;
    }

    if (hasMoves("rock", "paper")) {return "Paper Covers Rock. ";}
    else if (hasMoves("rock", "scissors")) {return "Rock breaks scissors. ";}
    else if (hasMoves("paper", "scissors")) {return "Scissors cut paper. ";}
    else {return "";}// return empty if draw
}



/**
 * change winner text to who won a rock paper scissors game (computer or player)
 * 
 * Example: if computer wins with rock alertWinner(-1, "rock")
 * 
 * @param {number} winner - numerical value of who won, -1 for computer win, 
 *                          0 for tie, 1 for player win
 * @param {string} computerChoice - what move the computer chose
 */
function alertWinner(winner, computerChoice) 
{
    selectComputerMove(computerChoice); // select image of computer's move

    gameIsFinished = true; 

    let winnerText = document.getElementById("winnerText");
    let alert = getWinnerText(computerChoice); // start of winnerText (e.g. scissors cut paper)
    let spanText = document.createElement("span"); // coloured text
    switch (winner) 
    {
        case -1:
            // make "You Lose!" yellow and add to winnerText
            spanText.textContent = "You Lose!";
            spanText.style.color = "#fdca75";
            winnerText.textContent = alert;
            winnerText.appendChild(spanText);
            break;
        case 0:
            winnerText.textContent = alert + "Its a Draw!";
            break;
        case 1:
            // make "You Win!" red and add to winnerText
            spanText.textContent = "You Win!";
            spanText.style.color = "#fd2e6c";
            winnerText.textContent = alert;
            winnerText.appendChild(spanText);
            break;
        default:
            break;
    }  

    // ask for play again and make button reset game onclick
    let gamebutton = document.getElementById("gameButton");
    gamebutton.textContent = "Play Again";
    gamebutton.onclick = resetGame;
}



// resets elements changed during game
function resetGame()
{
    // reset game state
    gameIsFinished = false;

    // deselect move buttons
    deselectMoves();

    // reset player choice
    playerChoice = null;

    // reset winner text properties
    let winnerText = document.getElementById("winnerText");
    winnerText.textContent = "Rock, Paper, Scissors";
    winnerText.style.color = "white";

    // reset play button text and onclick function
    let gamebutton = document.getElementById("gameButton");
    gamebutton.textContent = "Let's Go!";
    gamebutton.onclick = rockPaperScissors;
}



// changes button choices to unselected opacity and unselected image
function deselectMoves()
{
    // do not run move select code if game is finished
    if (gameIsFinished) {return;}

    setButtonOpacity(.7);
    const choiceArray = ["rockImage", "paperImage", "scissorsImage"];
    const moveArray = ["rock", "paper", "scissors"];
    for (let i = 0; i < choiceArray.length; i++)
    {
        let img = moveArray[i];
        let choiceButton = document.getElementById(choiceArray[i]);
        choiceButton.src = "img/"+img+"/"+img+".png";
    } 
}



// changes opacity of rock, paper, scissor buttons
function setButtonOpacity(opacity)
{
    const choiceArray = ["rock", "paper", "scissors"];
    for (let i = 0; i < choiceArray.length; i++)
    {
        let choiceButton = document.getElementById(choiceArray[i]);
        choiceButton.style.opacity = opacity;
    } 
}



/** deselects all moves then selects given move
 *  @param {string} move - either rock, paper, or scissors
 */
function selectMove(move)
{
    // do not run move select code if game is finished
    if (gameIsFinished) {return;}

    // set buttons to unselected
    deselectMoves();
    
    // gets button of choice
    let choice = document.getElementById(move);
    let choiceImage = document.getElementById(move+"Image");
    
    // if already selected, deselect
    if (playerChoice === move)
    {
        playerChoice = null;
        choiceImage.src = "img/"+move+"/"+move+".png";
        setButtonOpacity(.7);
    }
    else // highlight & record new choice
    {
        playerChoice = move;
        choice.style.opacity = 1;
        choiceImage.src = "img/"+move+"/"+move+"Player.png";
    }
}



/** changes computer's move's buttons to selected for the computer
 *  @param {string} move - either rock, paper, or scissors
 */
function selectComputerMove(move)
{
    const moveArray = ["rock", "paper", "scissors"];

    let choice = document.getElementById(move); // button element
    choice.style.opacity = 1; // select image
    let choiceImage = document.getElementById(move+"Image"); // get image element
    let moveNumber = moveArray.indexOf(move); // get index of move to compare with playerChoice

    // if already selected by player, use tie image
    if (moveNumber === playerChoice)
    {
        choiceImage.src = "img/"+move+"/"+move+"Tie.png";
    }
    else
    {
        choiceImage.src = "img/"+move+"/"+move+"Computer.png";
    }
}
