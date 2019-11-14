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


    //bundle data

    let formData = {
      player1: username1,
      player2: username2,
      player3: username3
      }

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
      debugger;
      return response.json()
    })
    .then(function(newUsers){
      

    })

  }

}




// ****************************************************************************

let buttonsArray = document.querySelectorAll(".letter-button")
 buttonsArray.forEach((button) => {button.addEventListener("click", renderLetter)})
let subButton = document.getElementById("word-submit")
subButton.addEventListener("click", listWord)
let clearButton = document.getElementById("clear")
clearButton.addEventListener("click", function(e){
  displayBox.innerText = ""
})


function renderLetter(e){


   displayBox.innerText = displayBox.innerText + e.target.innerText

}


function listWord(e){
  let wordUl = document.getElementById("word-list")
  let wordLi = document.createElement("li")
  wordLi.innerText = displayBox.innerText
  if (displayBox.innerText.length > 2){
    wordUl.append(wordLi)
    // fetch post to backend
    displayBox.innerText = ""
    }
}

function updateBoardLetters(letter_pop){
  // takes in 16 character string and assigns letters to the appropriate button
  [...letter_pop].forEach(function(letter, index){
    let row = Math.floor(index/4)+1
    let column = index%4+1
    // button id are formatted R1-L1
    currentButton = document.getElementById(`R${row}-L${column}`)
    currentButton.innerText = letter
  })
}
updateBoardLetters("letsgoteamschema")


function getGameboard(){
  // fetch predetermined rows
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

})
