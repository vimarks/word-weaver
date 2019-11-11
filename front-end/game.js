
document.addEventListener("DOMContentLoaded", function(){









const rowOne = document.getElementById("row-1")
rowOne.addEventListener("click", renderLetter)

function renderLetter(e){

  const displayBox = document.getElementById("display-box")
  displayBox.innerText = e.target.innerText
}

function getGameboard(){
  // fetch predetermined rows
}


})
