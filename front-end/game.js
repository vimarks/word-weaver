
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
    .then(function(userArray)
    {debugger;userArray})

  }

}




// ****************************************************************************
// steven's side of the wall
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




function getGameboard(){
  // fetch predetermined rows
}


})
