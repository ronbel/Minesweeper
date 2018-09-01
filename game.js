
//Game setting parameters//

let grid;
let rows=20,cols=20,mine=81; //Default values//

//Game state variables//
let gameOver=false;
let remainingMines;
let hiddenCells;

//HTML variables//
let canvas, context;
let rem_text=document.getElementById('rem_text');

let mine_icon=new Image();
mine_icon.src='Images/mine_icon.png';

let flag_icon=new Image();
flag_icon.src='Images/flag_icon.png';



document.getElementById('start').addEventListener('click',function(){
    let temp=document.getElementById('start');
    temp.innerHTML='Restart';
    setupGame();
    
});

function updateRemText(){
    rem_text.innerHTML='Mines Remaining: '+remainingMines;
}


function makeNewGrid()
{
    let row_array=new Array(rows);
    for(let i=0;i<rows;i++){
        row_array[i]=new Array(cols);
    }
    for(i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
               row_array[i][j]=new Cell();
            }

        }
    
    return row_array;
}

function revealAllMines(){
    for(i=0;i<rows;i++){
        for(j=0;j<cols;j++){
            if(grid[i][j].mined && !grid[i][j].revealed){
                showCell(i,j);
            }
        }
    }
}

function revealCell(x,y)
{
    if(!grid[x][y].revealed && !grid[x][y].flagged){
        grid[x][y].revealed=true;
        hiddenCells--;
        showCell(x,y);
         if(grid[x][y].mined){
             gameOver=true;
             revealAllMines();
             alert('You lost!');
             }
        else if(grid[x][y].number==0){
            for(let i=x-1;i<x+2;i++){
                if(i>=0 && i<rows){
                for(let j=y-1;j<y+2;j++){
                    if(j>=0 && j<cols) {
                            revealCell(i,j);
                        }
        
                    }
                }
            }
           
        }

    }
}
function showCell(x,y){
    context.fillStyle='white';
    context.fillRect(x*20+1,y*20+1,18,18);
    context.fillStyle='black';
    if(grid[x][y].number>0){
        context.fillText(String(grid[x][y].number),x*20+2,(y+1)*20-2);
    }
    else if(grid[x][y].mined){
        context.drawImage(mine_icon,x*20+1,y*20+1);
    }
}

function showFlag(x,y){
    context.fillStyle='grey';
    if(grid[x][y].flagged){
        context.drawImage(flag_icon,x*20+1,y*20+1);
    }
    else{
    context.fillRect(x*20+1,y*20+1,18,18);
    }
}

function flagCell(x,y){
    if(!grid[x][y].revealed && !gameOver){
    grid[x][y].flagged=!grid[x][y].flagged;
    remainingMines=grid[x][y].flagged?remainingMines-1:remainingMines+1;
    showFlag(x,y);
    updateRemText();
    }
}
   



function getMouseCell(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor((evt.clientX - rect.left)/20),
      y: Math.floor((evt.clientY - rect.top)/20)
    };
}







//Game setup related functions//
function Cell()
{
    this.mined=false;
    this.revealed=false;
    this.flagged=false;
    this.number=0;
}

function selectMineCells(){
    for(let i=0;i<mine;)
    {
        let x=Math.floor(Math.random()*rows);
        let y=Math.floor(Math.random()*cols);
        if(!grid[x][y].mined)
        {
            grid[x][y].mined=true;
            grid[x][y].number=-1;
            i++;
        }
    }

}

function countMines(x,y){
    let cnt=0;
    for(let i=x-1;i<x+2;i++){
        if(i>=0 && i<rows){
        for(let j=y-1;j<y+2;j++){
            if(j>=0 && j<cols) {
                if(grid[i][j].mined==true){
                    cnt++;
                }

            }
        }
    }
    }
    grid[x][y].number=cnt;
}

function fillNumbers()
{
    for(let x=0;x<rows;x++){
        for(let y=0;y<cols;y++){
            if(!grid[x][y].mined){
                countMines(x,y);
            }
        }
    }
}

function drawCanvas(h,w){
    canvas = document.createElement('canvas');
    canvas.id='board';
    canvas.width  = w;
    canvas.height = h;
    canvas.style.position = "absolute";
    canvas.style.border   = "1px solid";
    canvas.style.background='grey';
    document.body.appendChild(canvas);

    context=canvas.getContext('2d');

    for(x=0;x<=w;x+=20){
        for(y=0;y<=h;y+=20){
           
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
        if(pos.x>=rows || pos.y>=cols){
            return;
        }
        if(event.button==0){
         if(!grid[pos.x][pos.y].revealed && !grid[pos.x][pos.y].flagged && !gameOver){
                  revealCell(pos.x,pos.y);
                  if(hiddenCells==0){
                      for(i=0;i<rows;i++){
                          for(j=0;j<cols;j++){
                              if(grid[i][j].mined){
                                  flagCell(i,j);
                              }
                          }
                      }
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


function setupGame()
{
    drawCanvas(cols*20,rows*20);
    grid=makeNewGrid();
    selectMineCells();
    fillNumbers();
    gameOver=false;
    remainingMines=mine;
    hiddenCells=rows*cols-mine;
    updateRemText();
}