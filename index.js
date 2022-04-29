console.log("Index.js");

//game constants and variables
let direction ={x: 0, y: 0};
let foodSound = new Audio('music/food.mp3');
let gameOverSound = new Audio('music/gameover.mp3');
let moveSound = new Audio('music/move.mp3');
let music = new Audio('music/music.mp3');
let speed = 2;
let prevTime = 0;
let snakeArray = [{x: 13 ,y: 15}];
let food = {x: 13,y: 12};
let score = 0;
let box = document.getElementById("box");
//game functions

function main(ctime){
    window.requestAnimationFrame(main);
    if(ctime-prevTime<1000/speed){
        return;
    }
    prevTime = ctime;
    reset();
    gameEngine();
    // console.log(ctime);
}
function collide(arr){
    if(snakeArray[0].x < 1 || snakeArray[0].y < 1 || snakeArray[0].x>=18 || snakeArray[0].y>=18){return true;}
    return false;
}
function reset(){
    let n = snakeArray.length;
    
    let prev = document.getElementById(`${n-1}`);
    if(prev === null){return;}
    for(let i=0;i<n;i++){
        box.removeChild(document.getElementById(`${i}`));
    }
    let Food = document.querySelector(".food");
        
        Food.classList.remove("food")
}
function gameEngine(){
    // music.play();
    //Part 1 : Updating the snake array & Food
    
    if(collide(snakeArray)){
        gameOverSound.play();
        music.pause();
        direction.x = 0;
        direction.y = 0;
        alert("Game Over");
        snakeArray = [{x: 13,y: 15}];
        score = 0;
    }
    //move the snake
    
    if(food.x == snakeArray[0].x && food.y == snakeArray[0].y){
        let x = 2 + Math.round(Math.random()*12);
        let y = 2 + Math.round(Math.random()*12);
        food.x = x;
        food.y = y;
        score+=1;
        
        snakeArray.unshift({x: snakeArray[0].x+direction.x, y: snakeArray[0].y+direction.y});
       
    }
    for(let i=snakeArray.length-2;i>-1;i--){
        snakeArray[i+1] = {...snakeArray[i]};
    }
    snakeArray[0].x += direction.x;
    snakeArray[0].y += direction.y;
    //Part 2 : Display the snake and Food
    document.querySelector(".scoreboard").innerHTML = `<h1>Score : ${score}</h1>`
    // box.innerHtml = "";
    
    snakeArray.forEach(function(e,index){
        
        let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = (e.y);
        
        snakeElement.style.gridColumnStart = (e.x);
        if(index == 0){snakeElement.classList.add("head")}
        
        else{
            snakeElement.classList.add("snake");
        }
        
        snakeElement.id = `${index}`;
        box.appendChild(snakeElement);
    });
    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    
    box.appendChild(foodElement);
}




window.requestAnimationFrame(main)
window.addEventListener('keydown',function(e){
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("Arrow Up");
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            console.log("Arrow Down");
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":
            console.log("Arrow Left");
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            console.log("Arrow Down");
            direction.x = 1;
            direction.y = 0;
            break;
        case "f":
            speed += 1;
            break;

        default:
            console.log(e.key)
    }

});