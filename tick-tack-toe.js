let boxes = document.querySelectorAll(".box")
let resetButton = document.querySelector(".reset-button")
let newGameButton = document.querySelector("#new-button")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")

let turnO = true   // playerX / playerO

const winPattern = [ 
    [ 0 , 1 , 2 ],
    [ 0 , 4 , 8 ],
    [ 0 , 3 , 6 ],
    [ 1 , 4 , 7 ],
    [ 2 , 4 , 6 ],
    [ 2 , 5 , 8 ], 
    [ 3 , 4 , 5 ],
    [ 6 , 7 , 8 ]
]

const resetGame = ()=>{
    turnO = true
    enableBoxes()
    msgContainer.classList.add("hide")
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if (turnO === true){
            box.innerHTML= "O"
            turnO = false
            box.classList.add("playerO")
        }
        else{
            box.innerHTML = "X"
            turnO = true
            box.classList.remove("playerO")
        }
        box.disabled = true // for not change the value of button for double click

        checkWinner()
    })
})

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true
    }
}

const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false
        box.innerText = ""
    }
}
 
const showWinner = (winner) =>{
    msg.innerText = `Congratulations , The Winner Is ${winner}`
    msgContainer.classList.remove("hide")
    disableBoxes()
}
const showTieMsg = ()=>{
    msg.innerText = "You are now tie"
    msgContainer.classList.remove("hide")
    disableBoxes()
}

const checkWinner = ()=>{
    let isTie = true;
    for(let pattern of winPattern){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val)
                return;
            }
        }
        
    }

    boxes.forEach((box) => {
        if (box.innerText === "") {
            isTie = false;
        }
    });

    if (isTie) {
        showTieMsg();
    }
}


newGameButton.addEventListener("click",resetGame)
resetButton.addEventListener("click",resetGame)