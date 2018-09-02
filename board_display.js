let mine_icon=new Image();
mine_icon.src='Images/mine_icon.png';

let flag_icon=new Image();
flag_icon.src='Images/flag_icon.png';

let BACKGROUND_COLOR='grey';


function drawCanvas(h,w){
    canvas = document.createElement('canvas');
    canvas.id='board';
    canvas.width  = w;
    canvas.height = h;
    canvas.style.position = "absolute";
    canvas.style.border   = "1px solid";
    canvas.style.background=BACKGROUND_COLOR;
    document.getElementById('play_area').appendChild(canvas);

    context=canvas.getContext('2d');

    for(x=0;x<=w;x+=SIDE_LEN){
        for(y=0;y<=h;y+=SIDE_LEN){
            context.moveTo(x,0);
            context.lineTo(x,h);
            context.stroke();
            context.moveTo(0,y);
            context.lineTo(w,y);
            context.stroke();
        }
    }
    context.font='24px Arial';
    canvas.addEventListener('mouseup',function(event){
        let pos=getMouseCell(canvas,event);
        if(pos.x>=rows || pos.y>=cols){ //To prevent errors when clicking on the canvas frame
            return;
        }
        if(event.button==0){
         if(!grid[pos.x][pos.y].revealed && !grid[pos.x][pos.y].flagged && !gameOver){
                  revealCell(pos.x,pos.y);
                  if(hiddenCells==0){
                    flagRemainingCells();
                    gameOver=true;
                    alert('You won!');
                }
            }
        }
        else if(event.button==2){
                flagCell(pos.x,pos.y);
            
        }
        
    });
}

function getMouseCell(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor((evt.clientX - rect.left)/SIDE_LEN),
      y: Math.floor((evt.clientY - rect.top)/SIDE_LEN)
    };
}

function fillCell(x,y,color){
    context.fillStyle=color;
    context.fillRect(x*SIDE_LEN+1,y*SIDE_LEN+1,SIDE_LEN-2,SIDE_LEN-2);
}

function showCell(x,y){
    fillCell(x,y,'white');
    context.fillStyle='black';
    if(grid[x][y].number>0){
        context.fillText(String(grid[x][y].number),x*SIDE_LEN+2,(y+1)*SIDE_LEN-2);
    }
    else if(grid[x][y].mined){
        context.drawImage(mine_icon,x*SIDE_LEN+1,y*SIDE_LEN+1);
    }
}

function showFlag(x,y){
    
    if(grid[x][y].flagged){
        context.drawImage(flag_icon,x*SIDE_LEN+1,y*SIDE_LEN+1);
    }
    else{
    fillCell(x,y,BACKGROUND_COLOR);
    }
}

function cleanBoard(){
    for(x=0;x<rows;x++){
        for(y=0;y<cols;y++){
            fillCell(x,y,BACKGROUND_COLOR);
        }
    }
}