var gameStart = false

function respond(choice){
    var roomname = document.getElementById('roomname').value;
    if(choice=='create' && roomname.length!=0){
        const socket = io.connect("localhost:3000");
        console.log('room created: ',roomname)
        socket.emit('create', roomname);
        
    }
    else{
        var roomname = ''
    }
}

//setup canvas
const canvas = document.getElementById("tictac");
const ctx = canvas.getContext("2d");
ctx.globalCompositeOperation = "source-over";
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.position = "absolute";




//background image
var image = new Image();
image.src = "black.png";

//required
var team = true;
const width = 160;
const gap = 8;
var gameOver = false;
var start = true;
var okayToMove = true;


unchecked=[]
var invalid = false;
turn(team);
multiplayer = true;


//start game
image.onload = function(){
    ctx.drawImage(image, 300, 100, 500,500);
    xstart = 300;
    ystart = 100;
    window.addEventListener("click", e => {
        if(gameStart){
            if(!multiplayer){
                if(!gameOver && team && okayToMove){
                    userplay(e);
                    // wait(1000);
                }
                // wait(1000);
                if(!gameOver && !invalid && !team){
                    setTimeout(()=>moveAI(),1000)
                }
                invalid = false; 
            }
            else{
                if(!gameOver){
                    userplay(e);
                }
            }
        }
    });
}

//boxes 

//box properties
var box1={
    x: 340,
    y:220,
    checked: false,
    team: null
}

var box2={
    x: 340+width+gap,
    y:220,
    checked: false,
    team: null
}

var box3={
    x: 340+2*width+2*gap,
    y:220,
    checked: false,
    team: null
}

var box4={
    x: 340,
    y:220+width+gap,
    checked: false,
    team: null
}

var box5={
    x: 340+width+gap,
    y:220+width+gap,
    checked: false,
    team: null
}

var box6={
    x: 340+2*width+2*gap,
    y:220+width+gap,
    checked: false,
    team: null
}

var box7={
    x: 340,
    y:220+2*width+gap,
    checked: false,
    team: null
}

var box8={
    x: 340+width+gap,
    y:220+2*width+gap,
    checked: false,
    team: null
}

var box9={
    x: 340+2*width+2*gap,
    y:220+2*width+gap,
    checked: false,
    team: null
}

box = []
box[1] = box1
box[2] = box2
box[3] = box3
box[4] = box4
box[5] = box5
box[6] = box6
box[7] = box7
box[8] = box8
box[9] = box9

//gameplay
function userplay(e){
    // console.log(e.x, e.y)

    //clear error
    ctx.fillStyle = "Black";
    ctx.fillRect(378,613, 800,608);

    if(e.x>xstart && e.x<xstart+width && e.y>ystart && e.y<ystart+width && !box1.checked){
        check(box[1], team)
    }

    else if(e.x>xstart+width+gap && e.x<xstart+2*width+gap && e.y>ystart && e.y<ystart+width && !box2.checked){
        check(box[2],team)
    }

    else if(e.x>xstart+2*width+2*gap && e.x<xstart+3*width+2*gap && e.y>ystart && e.y<ystart+width && !box3.checked){
        check(box[3], team)
    }

    else if(e.x>xstart && e.x<xstart+width && e.y>ystart+width+gap && e.y<ystart+2*width+gap && !box4.checked){
        check(box[4], team)
    }

    else if(e.x>xstart+width+gap && e.x<xstart+2*width+gap && e.y>ystart+width+gap && e.y<ystart+2*width+gap && !box5.checked){
        check(box[5], team)
    }

    else if(e.x>xstart+2*width+2*gap && e.x<xstart+3*width+2*gap && e.y>ystart+width+gap && e.y<ystart+2*width+gap && !box6.checked){
        check(box[6], team)
    }
    
    else if(e.x>xstart && e.x<xstart+width && e.y>ystart+2*width+2*gap && e.y<ystart+3*width+2*gap && !box7.checked){
        check(box[7], team)
    }
    
    else if(e.x>xstart+width+gap && e.x<xstart+2*width+gap && e.y>ystart+2*width+2*gap && e.y<ystart+3*width+2*gap && !box8.checked){
        check(box[8], team)
    }

    else if(e.x>xstart+2*width+2*gap && e.x<xstart+3*width+2*gap && e.y>ystart+2*width+2*gap && e.y<ystart+3*width+2*gap && !box9.checked){
        check(box[9], team)
    }

    else{
        console.log("Invalid Move");
        ctx.fillStyle = '#00B4EB';
        ctx.font = "50px Courier"
        ctx.fillText("Invalid Move", 390,647);
        invalid = true
        team = !team
        okayToMove = false
    }

    //for single player
    okayToMove = !okayToMove
    
    team = !team
    console.log(team)
};



//AI's move
function moveAI(){
    // team = !team;
    unchecked=[];
    console.log(team)
    for(i=1;i<10;i++){
        if(!box[i].checked && !team){
            unchecked.push(box[i]);
        }
    }
    if(!box[5].checked && !team)
        check(box[5],team)
    else{
        check(unchecked[Math.floor(Math.random()*unchecked.length)],team)
    }
    team = true;
    okayToMove = true;
}


//turn
function turn(team){
    if(team){
        ctx.fillStyle = "black";
        ctx.fillRect(820,290,945,290)
        ctx.fillStyle = "orange";
        ctx.font = "30px Arial"
        ctx.fillText("X",62,350);
    }
    if(!team){
        ctx.fillStyle = "black";
        ctx.fillRect(34,290,155,290)
        ctx.fillStyle = "green";
        ctx.font = "30px Arial"
        ctx.fillText("O",1000,350);
    }
}



//if game over
window.onclick=function(){
    if(gameOver){
        console.log('gameOver')
        location.reload();
    }
}


function check(box, team){
    ctx.font = "100px Arial";
    box.team = team;
    box.checked = true
    if(team==true){
        ctx.fillStyle = 'orange';
        ctx.fillText("X",box.x,box.y);
    }
    if(team==false){
        ctx.fillStyle = 'green';
        ctx.fillText("O", box.x, box.y);
    }
    checkWinner();
    if(!gameOver)
        turn(!team);
    // wait(1000)
}



function checkWinner(){
    var k =0;
    var flag = 0;
    for(i=1;i<4;i++){
        //vertical
        if(box[i].checked && box[i+3].checked && box[i+6].checked && box[i].team==box[i+3].team && box[i].team==box[i+6].team)
        {
            ctx.beginPath();
            startx = 370;
            starty = 108;
            ctx.moveTo(startx+(i-1)*(width+gap),108);
            ctx.lineTo(startx+(i-1)*(width+gap), 605);
            ctx.lineWidth = "8";
            if(team){
                ctx.strokeStyle ="orange";
                ctx.stroke();
            }
            if(!team){
                ctx.strokeStyle ="green";
                ctx.stroke();
            }
            gameOver= true;
            console.log('gameOver')
        }
        
        //horizontal
        var j=i+k;
        if(box[j].checked && box[j+1].checked && box[j+2].checked && box[j].team==box[j+1].team && box[j].team==box[j+2].team)
        {
            ctx.beginPath();
            starty = 174;
            ctx.moveTo(293,starty+(i-1)*(width+gap));
            ctx.lineTo(800, starty+(i-1)*(width+gap));
            ctx.lineWidth = "8";
            if(team){
                ctx.strokeStyle ="orange";
                ctx.stroke();
            }
            if(!team){
                ctx.strokeStyle ="green";
                ctx.stroke();
            }
            gameOver=true;
            console.log('gameOver')
        }
        k+=2;

        //diagonal
        if(i==1 && box[i].checked && box[i+4].checked && box[i+8].checked && box[i].team==box[i+4].team && box[i].team==box[i+8].team)
        {
            ctx.beginPath();
            ctx.moveTo(296,112);
            ctx.lineTo(802, 585);
            ctx.lineWidth = "8";
            if(team){
                ctx.strokeStyle ="orange";
                ctx.stroke();
            }
            if(!team){
                ctx.strokeStyle ="green";
                ctx.stroke();
            }
            gameOver= true;
            console.log('gameOver')
        }
        
        //diagonal
        if(i==3 && box[i].checked && box[i+2].checked && box[i+4].checked && box[i].team==box[i+2].team && box[i].team==box[i+4].team)
        {
            ctx.beginPath();
            ctx.moveTo(798,109);
            ctx.lineTo(297, 591);
            ctx.lineWidth = "8";
            if(team){
                ctx.strokeStyle ="orange";
                ctx.stroke();
            }
            if(!team){
                ctx.strokeStyle ="green";
                ctx.stroke();
            }
            gameOver= true;
            console.log('gameOver')
        }
    }

    //if all checked 
    for(i=1;i<10;i++){
        if(box[i].checked)
            flag+=1;
        else 
        {
            flag=0;
            break;
        }
    }
    if(flag>8){
        gameOver = true;
        console.log('gameOver')
    }
}

//wait
function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
};