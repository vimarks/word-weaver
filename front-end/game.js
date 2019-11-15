
// displayBox is the div Element that displays the current word the user is making
let displayBox = document.getElementById("display-box")
let timerCountDownInterval
document.addEventListener("DOMContentLoaded", function(){

// hideBoard()
initializePlayerForm()
let startGameButton = document.getElementById("start-game")
startGameButton.addEventListener("click", startRound )

function hideBoard(){

  let buttonsArray = document.querySelectorAll(".letter-button")
  buttonsArray.forEach( (button) => {button.classList.add("visibility")} )
  let gameDisplay = document.querySelectorAll(".visibility")
  gameDisplay.forEach(function(element){
   element.style.display = "none"
  })
}

function showBoard(){

  let buttonsArray = document.querySelectorAll(".letter-button")
  buttonsArray.forEach((button) => {button.classList.add("visibility")})
  let gameDisplay = document.querySelectorAll(".visibility")
  gameDisplay.forEach(function(element){
   element.style.display = "inline"
  })
}

function hideSetupMenu() {
  let setupMenu = document.querySelectorAll(".welcome-form")
  setupMenu.forEach(function(e){
    e.style.display = "none"
  })
}

function rotateLetters(){
  let letterButtons = document.querySelectorAll(".letter-button")
}








function initializePlayerForm(){

  let playerSelector = document.querySelector("select")
  playerSelector.addEventListener("change", playerFormHandler)
}

function playerFormHandler(e){
  e.preventDefault()
  let player1Box = document.getElementById("p1username")
  let player2Box = document.getElementById("p2username")
  player2Box.style.display = "none"
  let player3Box = document.getElementById("p3username")
  player3Box.style.display = "none"
  let playerSelector = document.querySelector("select")

  if (playerSelector.value === "2"){
    player2Box.style.display = "inline"

  }

  if (playerSelector.value === "3"){
    player2Box.style.display = "inline"
    player3Box.style.display = "inline"
  }




}

function startRound(e){
  e.preventDefault()

  let username1 = document.getElementById("p1username").value;
  let username2 = document.getElementById("p2username").value;
  let username3 = document.getElementById("p3username").value;


  //bundle data as array of hashes

  let formData = { users: [
    {username: username1},
    {username: username2},
    {username: username3}
  ]}


  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }
  fetch( "http://localhost:3000/users", configObj)
  .then(function (response){
    return response.json()})
  .then(function(dataObj){
    let gamesArray = dataObj["games"]
    let gameIds = gamesArray.map(game => game.id)
    sessionStorage.setItem("game_ids",gameIds)
    sessionStorage.setItem("completed_games","")

    let usersArray = dataObj["users"]
    let userIds = usersArray.map(user => user.id)
    sessionStorage.setItem("user_ids",userIds)

    let usernames = usersArray.map(user => user.username)
    sessionStorage.setItem("usernames",usernames)

    let boardString = dataObj["board"]
    sessionStorage.setItem("board",boardString)
    updateBoardLetters(boardString)

    let player = sessionStorage.getItem("usernames").split(",")[0]

    startVisualGame(player)
    displayCurrentPlayer()
    hideSetupMenu()
    // gameTimerEnded()

  })

}

function displayCurrentPlayer(){
  let currentPlayerNav = document.getElementById("current-player")
  let roundMemberList = sessionStorage.getItem("usernames")
  currentPlayerNav.innerText = roundMemberList.split(",")[0]
  let playingNext = document.getElementById("playing-next")

  roundMemberList = roundMemberList.split(",")
  if (roundMemberList.length === 3) {
    playingNext.innerText = roundMemberList.slice(-2)
  }
  else if ( roundMemberList.length === 1) {
    playingNext.innerText = "queue empty"
  }
  else {
    playingNext.innerText = roundMemberList[1]
  }
}

function updateRoundMemberList(){
  let roundMemberList = sessionStorage.getItem("usernames").split(",")
  roundMemberList.shift()
  sessionStorage.setItem("usernames",roundMemberList)
}

function updateRoundGamesList(){
  let roundGames = sessionStorage.getItem("game_ids").split(",")
  let completedGames = sessionStorage.getItem("completed_games").split(",")
  completedGames.push(roundGames.shift())
  sessionStorage.setItem("completed_games", completedGames)
  sessionStorage.setItem("game_ids", roundGames)
}

// ****************************************************************************
// steven's side of the wall

let timerCountDown = document.getElementById("timer-count-down")


let buttonsArray = document.querySelectorAll(".letter-button")
 buttonsArray.forEach((button) => {button.addEventListener("click", renderLetter)})
let subButton = document.getElementById("word-submit")
subButton.addEventListener("click", submitWordClicked)
let clearButton = document.getElementById("clear")
clearButton.addEventListener("click", clearCurrentWord)


function clearCurrentWord(e){
  clearButtonDataSet()
  buttonsArray.forEach(button=> {enableButton(button)})
  displayBox.innerText = ""
}

function submitWordClicked(event){
  let currentWord = displayBox.innerText
  if (currentWord.length > 2){

    let currentGameId = sessionStorage.getItem("game_ids").split(",")[0]
    sendWordToBackend(currentWord,currentGameId)
  }

}


function sendWordToBackend(word, game_id = 0){
  // sends word to backend and returns true if valid, false otherwise
  // bundle the word as an object with key word, and an id of the game
  // so the word is saved to a game

  let bodyObj = {
    word: word,
    game_id: game_id
  }
  // create a configuration object to send to the words controller back end
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(bodyObj)
  }


  fetch( "http://localhost:3000/words", configObj)
    .then(function (response){
      return response.json()
    })
    .then(function(parsedResponse){


      // apply the results of the backend response
      let wordValid = false

      if (parsedResponse.word){
        wordValid = true
      }

      if ( wordValid ){
        listWord(word)
        clearCurrentWord()
      } else {
        alert("word not valid")
      }

    })

}



function renderLetter(e){
  let currentButton = event.target

  if(displayBox.dataset.usedButtons && displayBox.dataset.usedButtons.includes(currentButton.id)){
    // there are usedButtons and the current button is used
    // do nothing
  } else {
    // its an unused button
    // add to dataset and add to displaybox
    addButtonToDataSet(currentButton)
    disableButton(currentButton)
    displayBox.innerText = displayBox.innerText + currentButton.innerText
  }
}

function disableButton(button){
  button.disabled=true
}
function enableButton(button){
  button.removeAttribute("disabled")
}

function listWord(word){
  // finds UL, creates new li, appends li to ul
  let wordUl = document.getElementById("word-list")
  let wordLi = document.createElement("li")
  wordLi.innerText = word
  wordUl.append(wordLi)
  displayBox.innerText = ""
}

function clearWordList() {
  let wordUl = document.getElementById("word-list")
  wordUl.innerHTML = ""
}

function startGameTimer(timeLimit){
  // starts a timer for the game, calls gameTimerEnded after elapsed time
  // time limit is the number of minutes the game will last
  let endTime = timeLimit*60*1000
  window.setTimeout(gameTimerEnded, endTime)
}

function gameTimerEnded(){
  clearInterval(timerCountDownInterval)
  let roundMemberList = sessionStorage.getItem("usernames").split(",")
  if(roundMemberList.length != 1){
    debugger;
    updateRoundMemberList()
    updateRoundGamesList()
    startVisualGame()


  }else {
    submitEndedRound()
    endRound()
  }

  // should submit ended game and start new game if appropriate
  //clear sessionStorage
}

function endRound() {

console.log("these aren't the rounds you're looking for")
}

function startVisualGame(){
  startTimerCountDown(1)
  startGameTimer(1)
  clearCurrentWord()
  clearWordList()
  displayCurrentPlayer()


  //reset timerCountDown/
  //clear displayBox
  //display currentPlayer
}

function submitEndedRound(){

  let currentGames = sessionStorage.getItem("game_ids").split(",")
  getAllGameWordsFromServer(currentGames)
}

// function startNextRound(nextPlayer){
//   let nextPlayer =
// }


function updateBoardLetters(letter_pop){
  // takes in 16 character string and assigns letters to the appropriate button
  [...letter_pop].forEach(function(letter, index){
    let row = Math.floor(index/4)+1
    let column = index%4+1
    // button id are formatted R1-L1
    let currentButton = document.getElementById(`R${row}-L${column}`)
    currentButton.innerText = letter
  })
}

updateBoardLetters("letsgoteamschema")


function startTimerCountDown(timeLimit){
  // time limit is the number of minutes the game will last
  timerCountDown.innerText=`${timeLimit}:00`
  timerCountDownInterval = setInterval(updateTimerCountDown,1000)
}

function getTimerCountDown(){

  let [minutes, seconds] = timerCountDown.innerText.split(":")
  minutes = parseInt(minutes)
  seconds = parseInt(seconds)
  seconds = seconds + minutes*60

  return seconds
}

function updateTimerCountDown(){
  let currentTime = getTimerCountDown()
  if (currentTime > 0){
    if (currentTime-1 == 0){
      clearInterval(timerCountDownInterval)
    }
    setTimerCountDown(currentTime-1)
  } else if (currentTime == 0){

    clearInterval(timerCountDownInterval)
  }

}

function setTimerCountDown(timeLeft){
  let minutes = Math.floor(timeLeft/60)
  let seconds = timeLeft%60
  timerCountDown.innerText = `${minutes}:${seconds}`
}






function addButtonToDataSet(buttonElement){

  if (displayBox.dataset.usedButtons){
    displayBox.dataset.usedButtons += " " + buttonElement.id
  } else {
    displayBox.dataset.usedButtons += " " + buttonElement.id
  }
}

function clearButtonDataSet(){
  displayBox.removeAttribute("data-used-buttons")
}

function getAllGameWordsFromServer(gameIdArray=[1,2,3,4]){
  // test with default [1,2,3,4]
  // takes an array of game_ids and sends them to the api
  // route is the games index
  let bodyObj = {
    game_ids: gameIdArray
  }
  // create a configuration object to send to the words controller back end
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(bodyObj)
  }
  fetch( "http://localhost:3000/games/1", configObj)
    .then(function (response){
      return response.json()
    })
    .then(function(userWordArray){
      // response should be an array
      // of objects with structure
      // {user: username, words:[word1,word2,...] }

      let winner = userWordArray.reduce(function(topScorer, userWord){
        let points = userWord.words.reduce(function(totalCharacters,word){
          return totalCharacters+word.length
        },0)
        if (topScorer.points<points){
          return {user: userWord.username, points: points}
        } else {
          return topScorer
        }
      },{user:"no winner",points:0})
      let winnerHeader = document.createElement("h1")
      winnerHeader.innerText = `${winner.user} won the round with ${winner.points} points`
      document.getElementById("round-word-list").append

      userWordArray.forEach(userWord=>displayGameWords(userWord))
    
    
    })
    .catch(error =>{
      if( error.message){

        window.alert(`${error.message} these aren't the games you're looking for`)
      }
    })

  }
  function displayGameWords(userWordObject){
    // input should be an object with structure
    // {user: username, words:[word1,word2,...] }
    let userNameHeader = document.createElement("h2")
    userNameHeader.innerText = userWordObject.user
    let wordCountHeader = document.createElement("h3")
    wordCountHeader.innerText = `Found ${userWordObject.words.length} words`
    let longWord = userWordObject.words.reduce(function(longest, word){
      if(longest.length<word.length){
        return word
      } else {
        return longest
      }
    })
    let wordLengthHeader = document.createElement("h3")
    wordLengthHeader.innerText = `Longest word: ${longWord}, ${longWord.length} characters`
    let wordList = document.createElement("ul")
    userWordObject.words.forEach(word=>{
      let userWordLi = document.createElement("li")
      userWordLi.innerText = word
      wordList.append(userWordLi)
    })
    document.getElementById("round-word-list").append(userNameHeader,wordCountHeader,wordLengthHeader, wordList)

  }

  

})
