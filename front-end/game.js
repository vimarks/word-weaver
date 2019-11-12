let displayBox
document.addEventListener("DOMContentLoaded", function(){









let buttonsArray = document.querySelectorAll(".letter-button")
 buttonsArray.forEach((button) => {button.addEventListener("click", renderLetter)})
let subButton = document.getElementById("submit")
subButton.addEventListener("click", listWord)
let clearButton = document.getElementById("clear")
clearButton.addEventListener("click", function(e){
  displayBox.innerText = ""
})


function renderLetter(e){

   displayBox = document.getElementById("display-box")
   displayBox.innerText = displayBox.innerText + e.target.innerText

}


function listWord(e){

  let wordUl = document.getElementById("word-list")
  let wordLi = document.createElement("li")
  wordLi.innerText = displayBox.innerText
  if (displayBox.innerText.length > 2)
  wordUl.append(wordLi)
  // fetch post to backend
  displayBox.innerText = ""

}




function getGameboard(){
  // fetch predetermined rows
}


})
