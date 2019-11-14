
// displayBox is the div Element that displays the current word the user is making
let displayBox = document.getElementById("display-box")
document.addEventListener("DOMContentLoaded", function(){

// hideBoard()
initializePlayerForm()

function hideBoard(){

  let buttonsArray = document.querySelectorAll(".letter-button")
  buttonsArray.forEach((button) => {button.classList.add("visibility")})
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
   element.style.display = "initial"
  })
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
    player2Box.style.display = "initial"

  }

  if (playerSelector.value === "3"){
    player2Box.style.display = "initial"
    player3Box.style.display = "initial"
  }
  let startGameButton = document.getElementById("start-game")
  startGameButton.addEventListener("click", startGame )

  function startGame(e){
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

      let usersArray = dataObj["users"]
      let userIds = usersArray.map(user => user.id)
      sessionStorage.setItem("user_ids",userIds)

      let usernames = usersArray.map(user => user.username)
      sessionStorage.setItem("usernames",usernames)

      let boardString = dataObj["board"]
      sessionStorage.setItem("board",boardString)
      updateBoardLetters(boardString)
      displayCurrentPlayer()
      // gameTimerEnded()
    })

  }

}

function displayCurrentPlayer(){
  let currentPlayerNav = document.getElementById("current-player")
  let roundMemberList = sessionStorage.getItem("usernames")
  currentPlayerNav.innerText = roundMemberList.split(",")[0]
  let playingNext = document.getElementById("playing-next")

  roundMemberList = roundMemberList.split(",")
  if (roundMemberList.length === 3) {
    playingNext.innerText = roundMemberList.slice(-2)
  } else {
    playingNext.innerText = roundMemberList[1]
  }
}

function updateRoundMemberList(){
  let roundMemberList = sessionStorage.getItem("usernames").split(",")
  roundMemberList.shift()
  sessionStorage.setItem("usernames",roundMemberList)
}


// ****************************************************************************
// steven's side of the wall

let timerCountDown = document.getElementById("timer-count-down")


let buttonsArray = document.querySelectorAll(".letter-button")
 buttonsArray.forEach((button) => {button.addEventListener("click", renderLetter)})
let subButton = document.getElementById("word-submit")
subButton.addEventListener("click", submitWordClicked)
let clearButton = document.getElementById("clear")
clearButton.addEventListener("click", function(e){
  displayBox.innerText = ""
})

function submitWordClicked(event){
  let currentWord = displayBox.innerText
  if (currentWord.length > 2){
    sendWordToBackend(currentWord)
  }

}


function sendWordToBackend(word){
  // sends word to backend and returns true if valid, false otherwise
  // bundle the word as an object with key word
  let bodyObj = {word: word}
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
      } else {
        alert("word not valid")
      }

    })

}



function renderLetter(e){


   displayBox.innerText = displayBox.innerText + e.target.innerText

}


function listWord(word){
  // finds UL, creates new li, appends li to ul
  let wordUl = document.getElementById("word-list")
  let wordLi = document.createElement("li")
  wordLi.innerText = word
  wordUl.append(wordLi)
  displayBox.innerText = ""
}

function startGameTimer(timeLimit){
  // starts a timer for the game, calls gameTimerEnded after elapsed time
  // time limit is the number of minutes the game will last
  let endTime = timeLimit*60*1000
  window.setTimeout(gameTimerEnded, endTime)
}
function gameTimerEnded(){
  let roundMemberList = sessionStorage.getItem("usernames").split(",")
  if(roundMemberList.length != 0){
    updateRoundMemberList()
    startVisualGame(nextPlayer)

  }else {
    submitEndedRound()
    endRound()
  }






  // should submit ended game and start new game if appropriate
  //clear sessionStorage
}
function startVisualGame(){
  startTimerCountDown(3)
  startGameTimer(3)
  displayBox = ""
  //reset timerCountDown/
  //clear displayBox
  //display currentPlayer
}

function submitEndedRound(){
  let currentGames = sessionStorage.getItem("games").split(",")
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
    currentButton = getElementById(`R${row}-L${column}`)
    currentButton.innerText = letter
  })
}

startTimerCountDown(3)
function startTimerCountDown(timeLimit){
  // time limit is the number of minutes the game will last
  timerCountDown.innerText=`${timeLimit}:00`
  window.setInterval(updateTimerCountDown,1000)
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
    setTimerCountDown(currentTime-1)
  }

}
function setTimerCountDown(timeLeft){
  let minutes = Math.floor(timeLeft/60)
  let seconds = timeLeft%60
  timerCountDown.innerText = `${minutes}:${seconds}`
}







})
